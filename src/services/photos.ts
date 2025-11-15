import { Env, Photo, GalleryResponse, ServiceType } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class PhotoService {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async uploadPhoto(
    file: File,
    metadata: {
      category: string;
      title?: string;
      description?: string;
    }
  ): Promise<Photo> {
    try {
      const photoId = uuidv4();
      const fileExtension = file.name.split('.').pop();
      const filename = `${metadata.category}/${photoId}.${fileExtension}`;

      // Upload to R2
      await this.env.PHOTOS.put(filename, file.stream(), {
        httpMetadata: {
          contentType: file.type
        },
        customMetadata: {
          category: metadata.category,
          title: metadata.title || '',
          description: metadata.description || '',
          uploadedAt: Date.now().toString(),
          originalName: file.name
        }
      });

      const photo: Photo = {
        id: photoId,
        filename,
        category: metadata.category as any,
        title: metadata.title,
        description: metadata.description,
        uploadedAt: Date.now(),
        metadata: {
          size: file.size
        }
      };

      // Store photo metadata in KV for quick listing
      await this.storePhotoMetadata(photo);

      return photo;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw new Error('Failed to upload photo');
    }
  }

  async getPhotosByCategory(category: string): Promise<GalleryResponse> {
    try {
      const photos: Photo[] = [];

      // List objects with the category prefix
      const listed = await this.env.PHOTOS.list({ prefix: `${category}/` });

      for (const object of listed.objects) {
        const metadata = object.customMetadata;

        if (metadata) {
          const photo: Photo = {
            id: object.key.split('/').pop()?.split('.')[0] || '',
            filename: object.key,
            category: metadata.category as any,
            title: metadata.title,
            description: metadata.description,
            uploadedAt: parseInt(metadata.uploadedAt || '0'),
            metadata: {
              size: object.size
            }
          };

          photos.push(photo);
        }
      }

      // Sort by upload date (newest first)
      photos.sort((a, b) => b.uploadedAt - a.uploadedAt);

      return {
        photos,
        total: photos.length,
        category
      };
    } catch (error) {
      console.error('Error fetching photos by category:', error);
      throw new Error('Failed to fetch photos');
    }
  }

  async getAllPhotos(): Promise<GalleryResponse> {
    try {
      const photos: Photo[] = [];

      // List all objects
      const listed = await this.env.PHOTOS.list();

      for (const object of listed.objects) {
        const metadata = object.customMetadata;

        if (metadata) {
          const photo: Photo = {
            id: object.key.split('/').pop()?.split('.')[0] || '',
            filename: object.key,
            category: metadata.category as any,
            title: metadata.title,
            description: metadata.description,
            uploadedAt: parseInt(metadata.uploadedAt || '0'),
            metadata: {
              size: object.size
            }
          };

          photos.push(photo);
        }
      }

      // Sort by upload date (newest first)
      photos.sort((a, b) => b.uploadedAt - a.uploadedAt);

      return {
        photos,
        total: photos.length
      };
    } catch (error) {
      console.error('Error fetching all photos:', error);
      throw new Error('Failed to fetch photos');
    }
  }

  async getPhoto(filename: string): Promise<R2ObjectBody | null> {
    try {
      const object = await this.env.PHOTOS.get(filename);
      return object;
    } catch (error) {
      console.error('Error fetching photo:', error);
      return null;
    }
  }

  async deletePhoto(filename: string): Promise<void> {
    try {
      await this.env.PHOTOS.delete(filename);

      // Also remove from metadata cache
      const photoId = filename.split('/').pop()?.split('.')[0];
      if (photoId) {
        await this.env.CHAT_MEMORY.delete(`photo:${photoId}`);
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw new Error('Failed to delete photo');
    }
  }

  async getFeaturedPhotos(limit: number = 10): Promise<Photo[]> {
    try {
      // Get photos from the 'featured' category
      const featured = await this.getPhotosByCategory('featured');

      if (featured.photos.length >= limit) {
        return featured.photos.slice(0, limit);
      }

      // If not enough featured photos, get recent from all categories
      const all = await this.getAllPhotos();
      return all.photos.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured photos:', error);
      throw new Error('Failed to fetch featured photos');
    }
  }

  async getPhotoUrl(filename: string): Promise<string> {
    // In production, you might want to use R2 public buckets or signed URLs
    // For now, we'll return a path that the worker can serve
    return `/api/photos/serve/${encodeURIComponent(filename)}`;
  }

  private async storePhotoMetadata(photo: Photo): Promise<void> {
    try {
      await this.env.CHAT_MEMORY.put(
        `photo:${photo.id}`,
        JSON.stringify(photo),
        {
          metadata: {
            category: photo.category,
            uploadedAt: photo.uploadedAt
          }
        }
      );
    } catch (error) {
      console.error('Error storing photo metadata:', error);
      // Don't throw - this is just for caching
    }
  }
}

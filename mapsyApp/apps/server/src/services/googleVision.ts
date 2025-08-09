import vision from '@google-cloud/vision';

// Initialize the client with API key
const client = new vision.ImageAnnotatorClient({
  apiKey: process.env.GOOGLE_VISION_API_KEY,
});

export interface LandmarkDetectionResult {
  landmarks: Array<{
    description: string;
    locations: Array<{
      latLng: {
        latitude: number;
        longitude: number;
      };
    }>;
    score: number;
  }>;
  webDetection?: {
    webEntities: Array<{
      description: string;
      score: number;
    }>;
    bestGuessLabels: Array<{
      label: string;
    }>;
    pagesWithMatchingImages?: Array<{
      url: string;
      pageTitle: string;
    }>;
  };
  textAnnotations?: Array<{
    description: string;
    locale?: string;
  }>;
}

export class GoogleVisionService {
  /**
   * Detect landmarks in an image
   */
  async detectLandmarks(imageBuffer: Buffer): Promise<LandmarkDetectionResult> {
    try {
      // Perform multiple detections in parallel
      const [
        landmarkResults,
        webDetectionResults,
        textDetectionResults
      ] = await Promise.all([
        client.landmarkDetection({ image: { content: imageBuffer } }),
        client.webDetection({ image: { content: imageBuffer } }),
        client.textDetection({ image: { content: imageBuffer } })
      ]);

      const landmarks = landmarkResults[0].landmarkAnnotations?.map(landmark => ({
        description: landmark.description || '',
        locations: landmark.locations?.map(location => ({
          latLng: {
            latitude: location.latLng?.latitude || 0,
            longitude: location.latLng?.longitude || 0,
          }
        })) || [],
        score: landmark.score || 0,
      })) || [];

      const webDetection = webDetectionResults[0].webDetection;
      const webDetectionFormatted = webDetection ? {
        webEntities: webDetection.webEntities?.map(entity => ({
          description: entity.description || '',
          score: entity.score || 0,
        })) || [],
        bestGuessLabels: webDetection.bestGuessLabels?.map(label => ({
          label: label.label || '',
        })) || [],
        pagesWithMatchingImages: webDetection.pagesWithMatchingImages?.map(page => ({
          url: page.url || '',
          pageTitle: page.pageTitle || '',
        })) || [],
      } : undefined;

      const textAnnotations = textDetectionResults[0].textAnnotations?.map(text => ({
        description: text.description || '',
        locale: text.locale,
      })) || [];

      return {
        landmarks,
        webDetection: webDetectionFormatted,
        textAnnotations,
      };
    } catch (error) {
      console.error('Error detecting landmarks:', error);
      throw new Error('Failed to process image with Google Vision API');
    }
  }

  /**
   * Get additional information about a detected landmark
   */
  async getPlaceDetails(landmarkName: string, latitude?: number, longitude?: number) {
    // This could be extended to use Google Places API for more details
    return {
      name: landmarkName,
      coordinates: latitude && longitude ? { latitude, longitude } : null,
      // Additional details could be fetched from other APIs
    };
  }
}

export const googleVisionService = new GoogleVisionService();
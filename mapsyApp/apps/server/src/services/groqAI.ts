import Groq from 'groq-sdk';
import type { LandmarkDetectionResult } from './googleVision.js';
import type { IPlaceRecommendation } from '../models/ChatMessage.js';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface TouristGuideContext {
  country: string;
  city: string;
  landmarkName?: string;
  landmarkInfo?: LandmarkDetectionResult;
  conversationHistory?: string[];
}

export class GroqAIService {
  private readonly model = 'llama3-8b-8192';
  
  /**
   * Generate tourist guide response based on landmark detection
   */
  async generateTouristResponse(
    context: TouristGuideContext,
    userQuery?: string
  ): Promise<string> {
    try {
      const prompt = this.buildTouristPrompt(context, userQuery);
      
      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: this.model,
        temperature: 0.7,
        max_tokens: 800,
      });

      return completion.choices[0]?.message?.content || 'Lo siento, no pude generar una respuesta en este momento.';
    } catch (error) {
      console.error('Error generating tourist response:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  /**
   * Generate place recommendations based on current location
   */
  async generateRecommendations(
    context: TouristGuideContext,
    currentLandmark?: string
  ): Promise<IPlaceRecommendation[]> {
    try {
      const prompt = this.buildRecommendationPrompt(context, currentLandmark);
      
      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: this.model,
        temperature: 0.6,
        max_tokens: 600,
      });

      const response = completion.choices[0]?.message?.content;
      return this.parseRecommendations(response || '');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  /**
   * Answer general questions about a place or city
   */
  async answerQuestion(
    context: TouristGuideContext,
    question: string
  ): Promise<string> {
    try {
      const prompt = this.buildQuestionPrompt(context, question);
      
      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: this.model,
        temperature: 0.5,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || 'Lo siento, no pude responder tu pregunta en este momento.';
    } catch (error) {
      console.error('Error answering question:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  private buildTouristPrompt(context: TouristGuideContext, userQuery?: string): string {
    let prompt = `Eres un guía turístico experto especializado en ${context.country}`;
    
    if (context.city) {
      prompt += `, específicamente en ${context.city}`;
    }
    
    prompt += '. Tu trabajo es proporcionar información cultural, histórica y práctica de manera amigable, detallada y entretenida.\n\n';

    if (context.landmarkName && context.landmarkInfo) {
      prompt += `El turista está visitando: ${context.landmarkName}\n`;
      
      if (context.landmarkInfo.landmarks && context.landmarkInfo.landmarks.length > 0) {
        const landmark = context.landmarkInfo.landmarks[0];
        prompt += `Ubicación: ${landmark.locations?.[0]?.latLng ? 
          `${landmark.locations[0].latLng.latitude}, ${landmark.locations[0].latLng.longitude}` : 
          'No disponible'}\n`;
        prompt += `Confianza de detección: ${Math.round(landmark.score * 100)}%\n`;
      }

      if (context.landmarkInfo.webDetection?.bestGuessLabels) {
        const labels = context.landmarkInfo.webDetection.bestGuessLabels
          .map(label => label.label)
          .join(', ');
        prompt += `Información adicional detectada: ${labels}\n`;
      }

      prompt += '\n';
    }

    if (userQuery) {
      prompt += `Pregunta específica del turista: "${userQuery}"\n\n`;
    }

    prompt += 'Proporciona información interesante incluyendo:\n';
    prompt += '- Historia y contexto cultural\n';
    prompt += '- Datos curiosos y anécdotas\n';
    prompt += '- Información práctica para la visita\n';
    prompt += '- Tips de fotografía si es relevante\n';
    prompt += '- Recomendaciones sobre el mejor momento para visitar\n\n';
    prompt += 'Responde de manera conversacional, como si fueras un guía local experto y amigable. Usa emojis ocasionalmente para hacer la respuesta más atractiva.';

    return prompt;
  }

  private buildRecommendationPrompt(context: TouristGuideContext, currentLandmark?: string): string {
    let prompt = `Eres un guía turístico local experto en ${context.country}`;
    
    if (context.city) {
      prompt += `, específicamente en ${context.city}`;
    }
    
    prompt += '.\n\n';

    if (currentLandmark) {
      prompt += `El turista acaba de visitar: ${currentLandmark}\n\n`;
    }

    prompt += 'Recomienda exactamente 3 lugares cercanos e interesantes para visitar a continuación. ';
    prompt += 'Pueden ser museos, monumentos, atracciones, restaurantes típicos, o sitios culturales.\n\n';
    prompt += 'Para cada recomendación, proporciona la información en el siguiente formato JSON:\n';
    prompt += '```json\n';
    prompt += '[\n';
    prompt += '  {\n';
    prompt += '    "name": "Nombre del lugar",\n';
    prompt += '    "type": "museum|monument|restaurant|attraction|park|viewpoint",\n';
    prompt += '    "distance": 500,\n';
    prompt += '    "description": "Descripción atractiva y detallada del lugar",\n';
    prompt += '    "rating": 4.5\n';
    prompt += '  }\n';
    prompt += ']\n';
    prompt += '```\n\n';
    prompt += 'Asegúrate de que las recomendaciones sean relevantes y estén realmente en la zona. ';
    prompt += 'La distancia debe ser en metros y realista. Solo responde con el JSON, sin texto adicional.';

    return prompt;
  }

  private buildQuestionPrompt(context: TouristGuideContext, question: string): string {
    let prompt = `Eres un guía turístico experto en ${context.country}`;
    
    if (context.city) {
      prompt += `, específicamente en ${context.city}`;
    }
    
    prompt += '. Responde la siguiente pregunta del turista de manera informativa y útil:\n\n';
    prompt += `Pregunta: "${question}"\n\n`;
    prompt += 'Proporciona una respuesta precisa, práctica y conversacional. ';
    prompt += 'Si es relevante, incluye tips locales, horarios, precios aproximados, o recomendaciones adicionales.';

    return prompt;
  }

  private parseRecommendations(response: string): IPlaceRecommendation[] {
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) || response.match(/\[([\s\S]*)\]/);
      
      if (!jsonMatch) {
        console.warn('No JSON found in recommendations response');
        return [];
      }

      const jsonStr = jsonMatch[1] ? `[${jsonMatch[1]}]` : jsonMatch[0];
      const recommendations = JSON.parse(jsonStr);

      // Validate and clean recommendations
      return recommendations.filter((rec: any) => 
        rec.name && rec.type && rec.description
      ).map((rec: any) => ({
        name: rec.name,
        type: rec.type,
        distance: rec.distance || undefined,
        description: rec.description,
        rating: rec.rating || undefined,
        coordinates: rec.coordinates || undefined,
        imageUrl: rec.imageUrl || undefined,
        openingHours: rec.openingHours || undefined
      }));
    } catch (error) {
      console.error('Error parsing recommendations:', error);
      return [];
    }
  }

  /**
   * Check if Groq service is available
   */
  async healthCheck(): Promise<boolean> {
    try {
      await groq.chat.completions.create({
        messages: [{ role: 'user', content: 'Hello' }],
        model: this.model,
        max_tokens: 10,
      });
      return true;
    } catch (error) {
      console.error('Groq health check failed:', error);
      return false;
    }
  }
}

export const groqAIService = new GroqAIService();
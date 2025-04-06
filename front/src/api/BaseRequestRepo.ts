import { apiClient } from "./apiClient";

class BaseRepository {
  static async ImageGenerationRequest(message: string, session: string) {
    const response = await apiClient({
      method: "GET",
      url: `/api/images/${session}/?userPrompt=${message}`,
    });
    return response.data;
  }

  static async reportGeneration(message: string, session: string) {
    const response = await apiClient<string>({
      method: "GET",
      url: `/api/chatCampaign/${session}/?userPrompt=${message}`,
    });
    return response.data;
  }

  static async postGeneration(message: string, session: string) {
    const response = await apiClient<string>({
      method: "GET",
      url: `/api/chatSocialMediaPost/${session}/?userPrompt=${message}`,
    });
    return response.data;
  }

  static async chatGreeting(session: string) {
    const response = await apiClient<string>({
      method: "GET",
      url: `/api/chatGreetings/${session}`,
    });
    return response.data;
  }

  static async getSession() {
    const response = await apiClient<string>({
      method: "GET",
      url: "/api/newChat",
    });
    return response.data;
  }
}

export default BaseRepository;

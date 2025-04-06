import os
from openai import AzureOpenAI

endpoint = "https://hackatongroup08674394590.openai.azure.com/"
model_name = "gpt-4o"
deployment = "gpt-4o"

subscription_key = ""
api_version = "2024-12-01-preview"
search_endpoint = "https://yetizure-search-service.search.windows.net/"
search_key = ""

client = AzureOpenAI(
    api_version=api_version,
    azure_endpoint=endpoint,
    api_key=subscription_key,
)

response = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant.",
        },
        {
            "role": "user",
            "content": "how many AI consultants?",
        }
    ],
    max_tokens=4096,
    temperature=1.0,
    top_p=1.0,
    model=deployment,
    extra_body={
      "data_sources": [{
          "type": "azure_search",
          "parameters": {
            "filter": None,
            "endpoint": f"{search_endpoint}",
            "index_name": "yetizure",
            "semantic_configuration": "azureml-default",
            "authentication": {
              "type": "api_key",
              "key": f"{search_key}"
            },
            "embedding_dependency": {
              "type": "endpoint",
              "endpoint": "https://hackatongroup08674394590.openai.azure.com/openai/deployments/yetizure-deployment-text-embedding-ada-002/embeddings?api-version=2023-07-01-preview",
              "authentication": {
                "type": "api_key",
                "key": ""
              }
            },
            "query_type": "vector_simple_hybrid",
            "in_scope": True,
            "strictness": 3,
            "top_n_documents": 5
          }
        }]
    }
)

print(response.choices[0].message.content)
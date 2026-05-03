import { ChatPromptTemplate } from "@langchain/core/prompts"
import { ChatOpenAI } from "@langchain/openai"
import { z } from "zod"

const summarySchema = z.object({
  summary: z
    .string()
    .describe("A short summary paragraph of the GitHub repository described in the README."),
  "cool facts": z
    .array(z.string())
    .describe("A list of cool or unique facts, features, or aspects of the repository found in the README.")
})

export async function summarizeReadmeWithLangChain(readmeContent) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a seasoned software engineer. Carefully read the following GitHub README file and produce a summary and cool facts. If not enough information is available, still provide both fields and mention the limitations."
    ],
    [
      "human",
      "Summarise this github repository from this readme file content:\n\n{readme}"
    ]
  ])

  const modelWithStructuredOutput = new ChatOpenAI({
    temperature: 0.0,
    model: "gpt-3.5-turbo"
  }).withStructuredOutput(summarySchema, {
    name: "github_summary",
    strict: true
  })

  const chain = prompt.pipe(modelWithStructuredOutput)

  return await chain.invoke({
    readme: readmeContent
  })
}

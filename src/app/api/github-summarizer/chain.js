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
      "You are a seasoned software engineer. Carefully read the following GitHub README file and produce a JSON object with two fields: 'summary' (a short paragraph) and 'cool facts' (a list of cool or unique features of the repo). If not enough information is available, still output both fields but mention the limitations. {format_instructions}"
    ],
    [
      "human",
      "Summarise this github repository from this readme file content:\n\n{readme}"
    ]
  ])

  const llm = new ChatOpenAI({
    temperature: 0.2,
    model: "gpt-3.5-turbo"
  })

  const partialedPrompt = await prompt.partial({
    format_instructions:
      "Respond ONLY with a JSON object matching this schema exactly: { summary: string, 'cool facts': string[] }"
  })

  const llmWithStructuredOutput = llm.withStructuredOutput(summarySchema, {
    name: "github_summary",
    strict: true
  })

  const chain = partialedPrompt.pipe(llmWithStructuredOutput)

  return await chain.invoke({
    readme: readmeContent
  })
}

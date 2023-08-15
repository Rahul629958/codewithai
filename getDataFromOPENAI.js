const { error } = require("console");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  // apiKey: process.env.API_KEY
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

module.exports = async function getDataFromOPENAI(prompt) {
  try{
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt +"\n Strictly write all the text other than code, in comment form.",
    temperature: 0.2,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0];
}
catch
{
  console.error(error);
  return {text:"Error while generating response."}
}
  
}

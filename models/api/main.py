import pandas as pd
import numpy as np
import nltk
import os
from nltk.sentiment import SentimentIntensityAnalyzer
from tqdm.notebook import tqdm
from fastapi import FastAPI
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import openai
import json
import requests
load_dotenv()
# import google.generativeai as genai
from openai import OpenAI

# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
openai.api_key = os.getenv("OPEN_API_KEY")
# llm_model=genai.GenerativeModel("gemini-pro")

MODEL = f"cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL,cache_dir="D:/transformers_cache")
sentiment_analysis_model = AutoModelForSequenceClassification.from_pretrained(MODEL)

sia = SentimentIntensityAnalyzer()
client = OpenAI(
         api_key=os.environ.get("OPENAI_API_KEY"),
        )

app= FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
def extract_issues(text):
    issues = text.split('\n')
    issues_dict = {}
    for i, issue in enumerate(issues, start=1):
        key = f"issue{i}"
        issues_dict[key] = issue.strip()

    return issues_dict

@app.get("/")
async def boot():
    return "Hi welcome to sentiment-analysis for Hackerflow!!"


@app.post("/sentiment_analysis")
async def sentiment_analysis(example: dict):
    text_in_question=""
    for key, value in example.items():
            text_in_question += str(value) + "\n"
    encoded_text = tokenizer(text_in_question, return_tensors='pt')
    output = sentiment_analysis_model(**encoded_text)
    scores = output[0][0].detach().numpy()
    print("scores:", scores)
    scores = softmax(scores)
    print("softmaxed scores:", scores)
    tri_pred=1
    pos=scores[2]
    neu=scores[1]
    neg=scores[0]
    if(pos>neg and pos>=neu):
        tri_pred=1
    elif(neg>pos and neg>=neu):
        tri_pred=-1
    elif(neu>pos and neu>neg):
        tri_pred=0
    scores_dict = {
    'roberta_neg' : scores[0].tolist(),
    'roberta_neu' : scores[1].tolist(),
    'roberta_pos' : scores[2].tolist(),
    'tri-pred' : tri_pred
    }
    return scores_dict

@app.post("/reviews_summarization")
async def reviews_summarization(reviews: dict):
    try:
        text_to_summarize=""
        for key, value in reviews.items():
            text_to_summarize += str(value) + "\n"
        # client = OpenAI(
        # # This is the default and can be omitted
        #  api_key=os.environ.get("OPENAI_API_KEY"),
        # )
        appended_prompt="\n\n"+" Give a pointwise list of all legitimate problems that is being faced by residents mentioned in the text above. Only list out the points.If multiple problems are the same, include them in a single point and do not repeat those points.Full sentences are not required.Get the point across in a easy and comprehensible manner.Make sure any numbers or anything specific is not missed out.Print it such that there is a new line between each issue.Filter out all those lines which contain any abusive or bad words or hate-speech."
        text_to_summarize+=appended_prompt
        response = client.chat.completions.create(
        messages=[
            {
            "role": "user",
            "content": text_to_summarize,
             }
        ],
        model="gpt-3.5-turbo",
        )
        res=response.choices[0].message.content
        dict_res=extract_issues(res)
        return dict_res
    except Exception as e:
        print(f"Error processing request: {str(e)}")

@app.post("/text_classification")
async def reviews_summarization(concerns: dict):
    try:
        text_to_summarize=""
        for key, value in concerns.items():
            text_to_summarize += str(value) + "\n"
        appended_prompt="\n\n"+" The above sentence is to be classified into one of the following 10 classes:\nInfrastructure Development: Comments related to the construction or improvement of physical infrastructure such as roads, bridges, railways, airports, and urban development projects.\nPublic Services: Feedback and complaints regarding the delivery of essential public services such as healthcare, education, sanitation, water supply, electricity, and public transportation.\nCorruption and Governance: Comments addressing issues of corruption, bureaucratic red tape, inefficiency, and transparency in government operations and decision-making processes.\nEnvironmental Impact: Concerns raised about the environmental impact of government projects, including issues related to pollution, deforestation, displacement of communities, and conservation efforts.\nSocial Welfare Programs: Discussions about the effectiveness, accessibility, and distribution of social welfare programs aimed at poverty alleviation, employment generation, rural development, and social justice.\nBudget Allocation and Fiscal Management: Comments analyzing government spending priorities, taxation policies, budget allocations, and fiscal management practices, including debates on resource allocation across different sectors.\nHealth Hazards and Safety Issues: Feedback regarding health hazards and safety concerns arising from government projects, such as pollution-related illnesses, unsafe working conditions, food safety issues, and public health emergencies\nSpam or Irrelevant Content: Comments categorized as spam, irrelevant, or intentionally misleading, lacking constructive criticism or substantive feedback on government projects or not relevant to any of the above categories. These may include promotional content, trolling, misinformation, or off-topic discussions that do not contribute meaningfully to the discourse on governance and public policy..\n\n Make sure only the class name(one of the above 11) is printed and nothing else.Make sure only one class name is printed nothing else."

        text_to_summarize+=appended_prompt
        # response=llm_model.generate_content(text_to_summarize)
        response = client.chat.completions.create(
        messages=[
            {
            "role": "user",
            "content": text_to_summarize,
             }
        ],
        model="gpt-3.5-turbo",
        )
        res=response.choices[0].message.content
        dict_res=extract_issues(res)
        return dict_res
    except Exception as e:
        print(f"Error processing request: {str(e)}")
#  !ngrok config add-authtoken 2dWjZYLkc9du9geJmvgupb6lzjf_4Mm25Vye7oDqWXJtWFLGD
#  !ngrok http 8000
# !uvicorn main:app --reload

import pandas as pd
import numpy as np
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
import nltk
nltk.download('vader_lexicon')
nltk.download('punkt')
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
# client = OpenAI(
#          api_key=os.environ.get("OPENAI_API_KEY"),
#         )

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
    fin_score=0
    if(pos>neg and pos>=neu):
        tri_pred=1
        fin_score=int(pos*10)
    elif(neg>pos and neg>=neu):
        tri_pred=-1
        fin_score=int(neg*10)
    elif(neu>pos and neu>neg):
        tri_pred=0
        fin_score=int(neu*10)
    fin_score=fin_score*tri_pred
    scores_dict = {
    'roberta_neg' : scores[0].tolist(),
    'roberta_neu' : scores[1].tolist(),
    'roberta_pos' : scores[2].tolist(),
    'tri_pred' : tri_pred,
    'fin_score' : fin_score
    }
    return scores_dict

@app.post("/reviews_summarization")
async def reviews_summarization(reviews: dict):
    try:
        text_to_summarize=""
        for key, value in reviews.items():
            text_to_summarize += str(value) + "\n"
        client = OpenAI(
        # This is the default and can be omitted
         api_key=os.environ.get("OPENAI_API_KEY"),
        )
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
        # response=llm_model.generate_content(text_to_summarize)
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
        appended_prompt="\n\n"+" The above sentence is a problem that is faced by an average citizen.If it is not,print only Spam/Irrelevant, and nothing else./nIf not, It is to be tackled by one of the following departments and hence, is to be classified into one of the following classes which represent each department,depending upon which department is the most suitable to tackle that problem:\nThe specific departments within a city government include/n:Administration: Responsible for overall management and coordination of city operations, including budgeting, and strategic planning./nFinance: Manages the city's finances, including budget preparation, revenue collection, accounting, and financial reporting./nPublic Works: Oversees infrastructure maintenance and development, including roads, bridges, parks, water supply, sewage systems, and waste management./nPlanning and Zoning: Develops and implements land use plans, zoning regulations, and development policies to guide the city's growth and development./nPublic Safety: Includes police and fire departments responsible for ensuring public safety, law enforcement, emergency response, and disaster management./nParks and Recreation : Manages public parks, recreational facilities, community centers, and programming for leisure and cultural activities./nHealth and Human Services: Provides public health services, social welfare programs, healthcare access, and support services for vulnerable populations./nTransportation: Oversees transportation infrastructure and services, including roads, public transit, parking, and traffic management./nHousing and Community Development: Addresses housing needs, affordable housing initiatives, neighborhood revitalization, and community development projects.Environmental Services: Manages environmental protection programs, sustainability initiatives, pollution control, and conservation efforts.Economic Development: Promotes economic growth, business retention and attraction, entrepreneurship support, and workforce development.Information Technology: Provides technology infrastructure, support services, and digital solutions to enhance government operations and citizen services.Legal: Provides legal counsel to the city government, drafts ordinances and contracts, handles litigation, and ensures compliance with laws and regulations.Communications and Public Affairs: Manages public relations, media relations, community outreach, and government communications to engage residents and stakeholders.Emergency Management: Coordinates emergency preparedness, response, and recovery efforts in collaboration with public safety agencies and other stakeholders.Make sure only one class name is printed nothing else."
#or any statement which doesn't satisfy the above classes or are not relevant to problems faced by citizens
        text_to_summarize+=appended_prompt
        # response=llm_model.generate_content(text_to_summarize)
        client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
        )
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

@app.post("/general_complaints")
async def reviews_summarization(reviews: dict):
    try:
        text_to_summarize=""
        for key, value in reviews.items():
            text_to_summarize += str(value) + "\n"
        appended_prompt="\n\n"+" The above text is a complaint that is faced by a citizen. We need to classify it into one of the following classes. Infrastructure and Utilities:\nIssues related to roads, bridges, sidewalks, streetlights, and public transportation.\nComplaints about water supply, sewage systems, drainage, and waste management.\nPublic Services:Concerns regarding the quality and accessibility of public services such as healthcare, education, and social welfare programs.\nComplaints about government offices, service centers, and bureaucratic procedures.\nPublic Safety and Law Enforcement:Complaints about crime, public disturbances, and illegal activities in neighborhoods.\nIssues related to police response times, effectiveness of law enforcement, and community policing efforts.\nEnvironment and Health:Concerns about pollution, air quality, water pollution, and environmental degradation.Complaints regarding public health hazards, sanitation, and disease outbreaks.\nHousing and Urban Development:Issues related to affordable housing, homelessness, and housing conditions.Complaints about urban planning, zoning regulations, and neighborhood development.\nEmployment and Economic Development:Concerns about job opportunities, unemployment rates, and labor conditions.Complaints regarding economic development initiatives, business regulations, and support for entrepreneurship.\nEducation and Youth Services:Issues related to the quality of education, school facilities, and access to educational resources.Complaints about youth programs, childcare services, and extracurricular activities.\nSocial Services and Welfare:Concerns about social welfare programs, assistance for vulnerable populations, and support for individuals in need.Complaints regarding access to healthcare, mental health services, and social assistance programs.\nTransportation and Traffic:Issues related to traffic congestion, parking, and transportation infrastructure.\nComplaints about public transit services, road safety, and traffic management.\nGovernment Accountability and Transparency:Concerns about corruption, transparency, and accountability in government operations.Complaints regarding government spending, taxation, and ethical conduct of public officials./nMake sure only the class name(one of the above 11) is printed and nothing else.Make sure only one class name is printed nothing else."
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
#  !ngrok config add-authtoken 2dWjZYLkc9du9geJmvgupb6lzjf_4Mm25Vye7oDqWXJtWFLGD
#  !ngrok http 8000
# !uvicorn main:app --reload

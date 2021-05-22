import asyncio
from .apps import SocketsConfig
from api.definitions.models import Definition
from api.bugreports.models import BugReport
from api.feedback.models import Feedback
from api.tutorials.models import Tutorial
from api.tutorials.serializers import TutorialSerializer


def get_chatbot_response(msg, sender):
    parsed = asyncio.run(
        SocketsConfig.rasa_agent.parse_message_using_nlu_interpreter(msg))

    intent = parsed['intent']['name']
    if intent == 'support':
        if len(parsed['entities']) == 0:
            return {"message": "I dont know the meaning of what you've asked", "action": "chat"}
        entity = parsed['entities'][0]['value']
        q = Definition.objects.filter(key=entity)
        if q.count() == 0:
            return {"message": "I haven't been taught the meaning of that term", "action": "chat"}
        return {"message": q.first().value, "action": "chat"}
    elif intent == 'bug_report':
        b = BugReport()
        b.client_id = sender
        b.description = msg
        b.save()
        b.title = "BugReport #" + str(b.id)
        b.save()
    elif intent == 'tutorial':
        if len(Tutorial.objects.all()) == 0:
            return {"message": "I haven't been taught how to do the thing you ask", "action": "chat"}
        ret = TutorialSerializer(Tutorial.objects.first()).data
        return {"message": ret, "action": "tutorial"}
    elif intent == 'feedback':
        b = Feedback()
        b.client_id = sender
        b.description = msg
        b.save()
        b.title = "Feedback #" + str(b.id)
        b.save()
    response = asyncio.run(SocketsConfig.rasa_agent.handle_text(msg))
    resp_txt = "Sorry, I didn't understand. Please try again."
    if len(response) > 0:
        resp_txt = response[0]['text']
    return {"message": resp_txt, "action": "chat"}

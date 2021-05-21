# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
#
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
#from typing import Any, Text, Dict, List, Union

class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_hello_world"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        x=tracker.get_slot("myentity")
 
        if x=="cvv":
            dispatcher.utter_message(text="CVV is Card Verification Number!")
        elif x=="name":
            dispatcher.utter_message(text="The name you are entering must be full name")
        elif x=="bank":
            dispatcher.utter_message(text="We accept all bank accounts")
        elif x=="money":
            dispatcher.utter_message(text="You need not pay any money")
        elif x=="mail":
            dispatcher.utter_message(text="You can use any valid mail id!")
        elif x=="card number":
            dispatcher.utter_message(text="Card number will be mentioned on the card itself!")
        elif x=="expiry":
            dispatcher.utter_message(text="Expiry Date will be mentioned on the card itself!")
        else:
            dispatcher.utter_message(text="Try out for tutorial for more information")


        return []

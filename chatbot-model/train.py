# from rasa.core.interpreter import create_interpreter
# print("Loading model")
# int_ = create_interpreter("./models/20210521-231331/core")
# print(int_)
# print("Model loaded")
# print(int_.parse("Hey"))

# from rasa.model import get_model
import asyncio
from rasa.core.agent import load_agent

print("Loading model")
loop = asyncio.get_event_loop()
tasks = [load_agent("./models")]
loaded_agent = loop.run_until_complete(asyncio.gather(*tasks))
loop.close()
print(loaded_agent)
print("model loaded")

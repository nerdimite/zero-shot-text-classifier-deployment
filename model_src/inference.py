import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

class ZeroShotClassifier():
    '''Zero Shot Text Classifier based on Natural Language Inference'''
    def __init__(self, model_path):
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
        
        self.hypothesis_template = "This text is about {}"
        
    def preprocess(self, text, classes):
        '''Preprocesses a single input text to align with each class'''
        # create the hypotheses for each class
        hypotheses = [self.hypothesis_template.format(c) for c in classes]

        # preprocess the inputs
        inputs = self.tokenizer(
            [text] * len(classes), 
            hypotheses, 
            return_tensors='pt',
            truncation='only_first',
            padding=True
        )['input_ids']

        return inputs
    
    def post_process(self, logits, classes):
        '''Post-processes the model output to get the entailment logits and get the class prediction'''
        idx = self.model.config.label2id['entailment']
        probabilities = torch.softmax(logits[:, idx], dim=0).tolist()

        output = []
        for i, prob in enumerate(probabilities):
            output.append(
                (classes[i], round(prob, 4))
            )
        
        sorted_outputs = sorted(output, key=lambda x: x[1], reverse=True)
        return sorted_outputs
    
    def predict(self, text, classes):
        '''Returns the final predictions for the inputs'''
        
        inputs = self.preprocess(text, classes)
        logits = self.model(inputs).logits
        output = self.post_process(logits, classes)
        
        return output
# Deploying a Zero Shot Classifier on CellStrat Hub

This repository contains the End-to-End source code for deploying a Zero-Shot Text Classifier as a REST API using [CellStrat Hub](https://cellstrathub.com) and integrating the API into a React App.

This repository will be presented as part of the Workshop on CellStrat Hub API which can be [RSVP'd here](https://www.meetup.com/Disrupt-4-0/events/280958772/)

## About the Model

Natural Language Inference or Recognizing Textual Entailment (RTE) is the task of classifying a pair of premise and hypothesis sentences into three classes: contradiction, neutral, and entailment.

| Premise                                                            | Hypothesis                                                         | Label         |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------- |
| A man inspects the uniform of a figure in some East Asian country. | The man is sleeping.                                               | contradiction |
| An older and younger man smiling.                                  | Two men are smiling and laughing at the cats playing on the floor. | neutral       |
| A soccer game with multiple males playing.                         | Some men are playing a sport.                                      | entailment    |

We can repurpose a model pretrained on NLI for Zero Shot Classification by

1. Pairing up the input text with each class (turn the class into a sentence format)
2. Get the entailment predictions for each pair
3. Apply a softmax and whichever combination results in the max entailment belongs to that class.

_See example below where the highest entailment is for `technology`_

| Premise (Input Text)                       | Hypothesis (Classes)                | Prediction                                  |
| ------------------------------------------ | ----------------------------------- | ------------------------------------------- |
| Tesla is launching their Full Self-Driving | This text is about **`technology`** | contra – 0.33, neu – 0.21, **`ent – 0.42`** |
| Tesla is launching their Full Self-Driving | This text is about `finance`        | contra – 0.14, neu – 0.27, `ent – 0.14`     |
| Tesla is launching their Full Self-Driving | This text is about `business`       | contra – 0.28, neu – 0.45, `ent – 0.22`     |

## Usage

### Model Deployment

[RSVP to the Workshop here](https://www.meetup.com/Disrupt-4-0/events/280958772/)

### Web App

#### Development

To start the development server of the app, change directory to [zero-shot-nlp-app](zero-shot-nlp-app/) folder and run,

```
yarn start
```

This starts the react app in `localhost:3000` or `http://<hub-workspace-url>:3000` (if running on CellStrat Hub Workspace)

#### Production Build

To build the production app, run

```
yarn build
```

This builds the static app for production to the `build` folder.

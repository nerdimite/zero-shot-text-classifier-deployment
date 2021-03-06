import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Label,
  Textbox,
  Button,
  Textarea,
  SecondaryButton,
  Badge,
  Progress,
} from "../components/core";

export default function Home() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [endpoint, setEndpoint] = useState("");
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [classes, setClasses] = useState([]);
  const [output, setOutput] = useState(null);

  const loadModel = async () => {
    setStatus(
      "🚧 Loading Model into Memory, Please Wait for around 30 seconds..."
    );
    setLoading(true);

    try {
      const raw_response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": key,
        },
        method: "GET",
      });
      const response = await raw_response.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setStatus("⚡ Model is Ready");
    setLoading(false);
  };

  const predict = async () => {
    setStatus("⏳ The model is performing inference");
    setLoading(true);

    try {
      const raw_response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": key,
        },
        method: "POST",
        body: JSON.stringify({
          text: text,
          classes: classes,
        }),
      });
      const response = await raw_response.json();
      console.log(response);
      setOutput(response["body"]["output"]);
    } catch (err) {
      console.log(err);
      alert("Something went wrong! Please try again.");
    }

    setStatus("⚡ Model is Ready");
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Zero Shot Text Classifier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl mt-4">
            🤖{" "}
            <span className="font-bold text-blue-600">
              Zero Shot Text Classifier
            </span>{" "}
            📜
          </h1>

          <div className="mt-3 text-lg sm:text-xl text-gray-700">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://cellstrathub.com"
              className="text-blue-600 hover:text-purple-600 transition ease-in-out duration-200"
            >
              Powered by CellStrat Hub API⚡
            </a>{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/nerdimite/zero-shot-text-classifier-deployment"
            >
              <div
                className="py-2 px-3  inline-block rounded-full \
                  bg-blue-200 text-sm hover:cursor-pointer hover:ring-1 hover:ring-blue-600 \
                  transition ease-in-out duration-200"
              >
                <span className="font-semibold text-blue-600">
                  Get Source Code{" "}
                </span>
                💻
              </div>
            </a>
          </div>
        </div>

        <Paper>
          <Label>Endpoint📡</Label>
          <div className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-600 mb-3 flex">
            https://api.cellstrathub.com/
            <input
              id="api-endpoint"
              className="grow border-none focus:outline-none"
              placeholder="username/api-name"
              onChange={(e) => {
                setEndpoint("https://api.cellstrathub.com/" + e.target.value);
              }}
            />
          </div>

          <Label>API Key🔑</Label>

          <div className="flex gap-2 mb-2">
            <input
              id="key"
              className="grow p-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-600"
              type="password"
              placeholder="Enter your Hub API Key"
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <SecondaryButton
              color="gray"
              disabled={loading}
              onClick={async () => {
                await loadModel();
              }}
            >
              Load Model
            </SecondaryButton>
          </div>

          <Label>Text📜</Label>
          <Textarea
            id="input-text"
            placeholder="Enter the text you want to classify"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <Label>Classes⚖️</Label>
          <Textbox
            id="classes"
            placeholder="Enter different classes (separated by comma `,`) like: Sports, Science, Technology, Business"
            onChange={(e) => {
              setClasses(e.target.value.split(","));
            }}
          />
          <div className="flex justify-between items-start flex-wrap">
            <p>
              <span className="font-semibold text-gray-700">Status:</span>{" "}
              {status}
            </p>
            <div className="flex items-center justify-center mt-2 gap-2">
              <Button
                className="w-full"
                disabled={loading}
                onClick={async () => {
                  await predict();
                }}
              >
                Predict Answer 🔮
              </Button>
            </div>
          </div>
        </Paper>

        <Paper>
          <Label>Predictions📊</Label>
          {output &&
            output.map((item, idx) => {
              let label = item[0];
              let value = (item[1] * 100).toFixed(2);
              return (
                <div key={idx}>
                  <Badge label={`${label}: ${value}%`} size="regular" />
                  <Progress value={value} />
                </div>
              );
            })}
        </Paper>
      </Container>
    </div>
  );
}

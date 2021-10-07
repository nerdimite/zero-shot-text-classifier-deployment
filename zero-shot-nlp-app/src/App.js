import { useState } from "react";
import { Container } from "./components/layout";
import {
  Title,
  Subtitle,
  Textbox,
  Textarea,
  Button,
  Progress,
  Badge,
} from "./components/core";

const Results = (props) => {
  const colorOptions = [
    { bg: "purple-200", text: "purple-600" },
    { bg: "blue-200", text: "blue-600" },
    { bg: "red-200", text: "red-600" },
    { bg: "green-200", text: "green-600" },
    { bg: "pink-200", text: "pink-600" },
    { bg: "yellow-200", text: "yellow-600" },
  ];
  let color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
  return (
    <div>
      <Badge
        label={`${props.label}: ${props.value}%`}
        bgColor={color.bg}
        textColor={color.text}
        size="regular"
      />
      <Progress value={props.value} bgColor={color.bg} barColor={color.text} />
    </div>
  );
};

function App() {
  const [text, setText] = useState("");
  const [classes, setClasses] = useState([]);
  const [key, setKey] = useState("");
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);

  const predict = async () => {
    setProcessing(true);

    try {
      const raw_response = await fetch(
        "https://api.cellstrathub.com/synchronous",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": key,
          },
          method: "POST",
          body: JSON.stringify({
            service_id: "zero-shot",
            input: {
              text: text,
              classes: classes,
            },
          }),
        }
      );
      const response = await raw_response.json();
      console.log(response);
      const body = JSON.parse(response["body"]);
      const output = JSON.parse(body["output"]);
      setResults(output);
    } catch (err) {
      console.log(err);
      alert("Please Retry!");
    }

    setProcessing(false);
  };

  return (
    <div>
      <div className="fixed top-0 left-0">
        <svg id="visual" viewBox="0 0 200 200" width="200" height="200">
          <defs>
            <linearGradient id="grad2_0" x1="0%" y1="100%" x2="56.3%" y2="0%">
              <stop
                offset="14.444444444444446%"
                stop-color="#001220"
                stop-opacity="1"
              ></stop>
              <stop
                offset="85.55555555555554%"
                stop-color="#001220"
                stop-opacity="1"
              ></stop>
            </linearGradient>
          </defs>
          <g transform="translate(0, 0)">
            <path
              d="M189 0C190.2 28.1 191.3 56.2 174.6 72.3C157.9 88.4 123.4 92.5 102.5 102.5C81.7 112.6 74.5 128.7 59.7 144.1C44.9 159.5 22.4 174.3 0 189L0 0Z"
              fill="#0066FF"
            ></path>
          </g>
        </svg>
      </div>
      <div className="fixed bottom-0 right-0">
        <svg id="visual" viewBox="0 0 200 200" width="200" height="200">
          <defs>
            <linearGradient id="grad1_0" x1="43.8%" y1="100%" x2="100%" y2="0%">
              <stop
                offset="14.444444444444446%"
                stop-color="#001220"
                stop-opacity="1"
              ></stop>
              <stop
                offset="85.55555555555554%"
                stop-color="#001220"
                stop-opacity="1"
              ></stop>
            </linearGradient>
          </defs>
          <g transform="translate(200, 200)">
            <path
              d="M-189 0C-189.7 -27.5 -190.3 -55 -174.6 -72.3C-158.9 -89.7 -126.9 -96.9 -105.4 -105.4C-83.8 -113.8 -72.8 -123.5 -57 -137.7C-41.2 -151.8 -20.6 -170.4 0 -189L0 0Z"
              fill="#0066FF"
            ></path>
          </g>
        </svg>
      </div>

      <Container>
        <div className="mt-2 mb-4 flex justify-between">
          <div>
            <Title>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.meetup.com/Disrupt-4-0/events/280958772/"
                className="hover:text-blue-600 transition ease-in-out duration-200"
              >
                Zero Shot Text Classifier Workshop
              </a>
            </Title>
            <Subtitle>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cellstrathub.com"
                className="hover:text-purple-600 transition ease-in-out duration-200"
              >
                Powered by CellStrat Hub API
              </a>
            </Subtitle>
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/nerdimite/zero-shot-text-classifier-deployment"
            className="flex justify-center items-center space-x-2 hover:text-blue-600 transition ease-in-out duration-200"
          >
            <span className="text-md font-medium">Source Code</span>
            <svg
              x="0px"
              y="0px"
              width="35px"
              height="35px"
              viewBox="0 0 438.549 438.549"
              className="hover:cursor-pointer"
            >
              <g>
                <path
                  d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
		c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
		c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
		c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
		c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
		c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
		c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
		c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
		c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
		c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
		c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
		c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
		c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
		c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
		c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
		c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
		c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
		c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
		c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
		C438.536,184.851,428.728,148.168,409.132,114.573z"
                />
              </g>
            </svg>
          </a>
        </div>
        <Textbox
          label="Enter your API Key"
          type="password"
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />
        <Textbox
          label="Enter different classes (separated by comma `,`)"
          placeholder="Example: Sports, Science, Technology, Business"
          onChange={(e) => {
            setClasses(e.target.value.split(","));
          }}
        />
        <Textarea
          label="Enter the input text you want to classify"
          placeholder="Deep Learning is very powerful..."
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          label="Make Zero Shot Classification"
          disabled={processing}
          onClick={async () => {
            await predict();
          }}
        />
        {results &&
          results.map((item, idx) => {
            return <Results label={item[0]} value={item[1] * 100} />;
          })}
      </Container>
    </div>
  );
}

export default App;

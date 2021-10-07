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
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);

  const predict = async () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setResults([
        { class: "Science", prob: 0.8 },
        { class: "Business", prob: 0.3 },
        { class: "Finance", prob: 0.5 },
        { class: "Finance", prob: 0.63 },
      ]);
    }, 500);
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
        <div className="mt-2 mb-4">
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
        <Textbox
          label="Enter Different Classes (separated by comma `,`)"
          placeholder="Example: Sports, Science, Technology, Business"
        />
        <Textarea
          label="Enter the Input Text you want to Classify"
          placeholder="Deep Learning is very powerful..."
        />
        <Button
          label="Make Zero Shot Prediction"
          disabled={processing}
          onClick={async () => {
            await predict();
          }}
        />
        {results &&
          results.map((item, idx) => {
            return (
              <Results
                label={item.class}
                value={Math.round(item.prob * 100, 3)}
              />
            );
          })}
      </Container>
    </div>
  );
}

export default App;

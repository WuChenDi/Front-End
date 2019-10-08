import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import TodoList from "./TodoList";

// function Welcome(props) {
//     return <h1>hello,{props.name}</h1>;
// }

// class Welcome extends React.Component {
//     render() {
//         return <h1>hello,{this.props.name}</h1>;
//     }
// }

// const element = <Welcome name="Sara" />;

// function App(){
//     return(
//         <div>
//             <Welcome name="Sara"></Welcome>
//             <Welcome name="Sara"></Welcome>
//             <Welcome name="Sara"></Welcome>
//         </div>
//     )
// }

// function formatDate(date) {
//     return date.toLocaleDateString();
// }

// const comment = {
//     date: new Date(),
//     text: "I hope you enjoy learning React!",
//     author: {
//         name: "Hello Kitty",
//         avatarUrl: "https://placekitten.com/g/64/64"
//     }
// };
// function Avatar(props) {
//     return (
//         <img
//             className="Avatar"
//             src={props.user.avatarUrl}
//             alt={props.user.name}
//         />
//     );
// }

// function UserInfo(props) {
//     return (
//         <div className="UserInfo">
//             <Avatar user={props.user} />
//             <div className="UserInfo-name">{props.user.name}</div>
//         </div>
//     );
// }

// function Comment(props) {
//     return (
//         <div className="Comment">
//             <UserInfo user={props.author} />
//             <div className="Comment-text">{props.text}</div>
//             <div className="Comment-date">
//                 {formatDate(props.date)}
//             </div>
//         </div>
//     );
// }
// ReactDOM.render(
//     <Comment date={comment.date} text={comment.text} author={comment.author} />,
//     document.getElementById("root")
// );

// function Clock(props) {
//     return (
//         <div>
//             <h1>Hello,world!</h1>
//             <h2>It is {props.date.toLocaleTimeString()}</h2>
//         </div>
//     );
// }

// function tick() {
//     ReactDOM.render(
//         <Clock date={new Date()}></Clock>,
//         document.getElementById("root")
//     );
// }

// setInterval(tick, 1000);

// function FormattedDate(props) {
//     return <h2>It is {props.date.toLocaleTimeString()}</h2>
// }

// class Clock extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { date: new Date() };
//     }

//     componentDidMount() {
//         this.timerID = setInterval(() => {
//             this.tick();
//         }, 1000);
//     }

//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }

//     tick() {
//         this.setState({
//             date: new Date()
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello world!</h1>
//                 <FormattedDate date={this.state.date} />
//             </div>
//         );
//     }
// }

// function App() {
//     return (
//         <div>
//             <Clock />
//             <Clock />
//             <Clock />
//         </div>
//     )
// }
// ReactDOM.render(<App />, document.getElementById("root"));

// class Toggle extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { isToggleOn: true };
//         this.handleClick = this.handleClick.bind(this);
//     }
//     handleClick() {
//         console.log(this)
//         this.setState(prevState => ({
//             isToggleOn: !prevState.isToggleOn
//         }));
//     }
//     render() {
//         return (
//             <button onClick={this.handleClick}>
//                 {this.state.isToggleOn ? "ON" : "OFF"}
//             </button>
//         );
//     }
// }
// ReactDOM.render(<Toggle />, document.getElementById("root"));

// function UserGreeting(props) {
//     return <h1>Welcome back!</h1>;
// }

// function GuestGreeting(props) {
//     return <h1>Please sign up.</h1>;
// }

// function Greeting(props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//         return <UserGreeting />;
//     }
//     return <GuestGreeting />;
// }

// ReactDOM.render(
//     <Greeting isLoggedIn={false} />,
//     document.getElementById("root")
// );

// class LoginControl extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleLoginClick = this.handleLoginClick.bind(this);
//         this.handleLogoutClick = this.handleLogoutClick.bind(this);
//         this.state = { isLoggedIn: false };
//     }
//     handleLoginClick() {
//         this.setState({ isLoggedIn: true });
//     }
//     handleLogoutClick() {
//         this.setState({ isLoggedIn: false });
//     }
//     render() {
//         const isLoggedIn = this.state.isLoggedIn;
//         let button;

//         if (isLoggedIn) {
//             button = <LogoutButton onClick={this.handleLogoutClick} />;
//         } else {
//             button = <LoginButton onClick={this.handleLoginClick} />;
//         }

//         return (
//             <div>
//                 <Greeting isLoggedIn={isLoggedIn} />
//                 {button}
//             </div>
//         );
//     }
// }
// function UserGreeting(props) {
//     return <h1>Welcome back!</h1>;
// }

// function GuestGreeting(props) {
//     return <h1>Please sign up.</h1>;
// }

// function Greeting(props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//         return <UserGreeting />;
//     }
//     return <GuestGreeting />;
// }

// function LoginButton(props) {
//     return <button onClick={props.onClick}>Login</button>;
// }

// function LogoutButton(props) {
//     return <button onClick={props.onClick}>Logout</button>;
// }
// ReactDOM.render(<LoginControl />, document.getElementById("root"));

// function Mailbox(props) {
//     const unreadMessages = props.unreadMessages;
//     return (
//         <div>
//             <h1>Hollo!</h1>
//             {unreadMessages.length > 0 && (
//                 <h2>you have {unreadMessages.length}unread messages</h2>
//             )}
//         </div>
//     );
// }

// const messages = ["react", "Re:React", "Re:Re:React"];
// ReactDOM.render(
//     <Mailbox unreadMessages={messages} />,
//     document.getElementById("root")
// );

// function WarningBanner(props) {
//     if (!props.warn) {
//         return null;
//     }

//     return <div className="warning">Warning!</div>;
// }

// class Page extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { showWarning: true };
//         this.handleToggleClick = this.handleToggleClick.bind(this);
//     }

//     handleToggleClick() {
//         this.setState(prevState => ({
//             showWarning: !prevState.showWarning
//         }));
//     }

//     render() {
//         return (
//             <div>
//                 <WarningBanner warn={this.state.showWarning} />
//                 <button onClick={this.handleToggleClick}>
//                     {this.state.showWarning ? "Hide" : "Show"}
//                 </button>
//             </div>
//         );
//     }
// }
// ReactDOM.render(<Page />, document.getElementById("root"));

// const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map(number => <li>{number}</li>);
// ReactDOM.render(<ul>{listItems}</ul>, document.getElementById("root"));

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((todo, index) => <li key={index}>{todo}</li>);
//     return <ul>{listItems}</ul>;
// }

// const numbers = [6, 7, 8, 9, 10];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById("root")
// );

// function ListItem(props) {
//     return <li>{props.value}</li>;
// }

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map(number => (
//         <ListItem key={number.toString()} value={number} />
//     ));
//     return <ul>{listItems}</ul>;
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById("root")
// );

// function Blog(props) {
//     const sidebar = (
//         <ul>
//             {props.posts.map(post => (
//                 <li key={post.id}>{post.title}</li>
//             ))}
//         </ul>
//     );
//     const content = props.posts.map(post => (
//         <div key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//         </div>
//     ));
//     return (
//         <div>
//             {sidebar}
//             <hr />
//             {content}
//         </div>
//     );
// }

// const posts = [
//     { id: 1, title: "Hello Wrold", content: "Welcome to learning React!" },
//     { id: 2, title: "Installation", content: "You can install React from npm." }
// ];
// ReactDOM.render(<Blog posts={posts} />, document.getElementById("root"));

// function ListItem(props) {
//     return <li>{props.value}</li>;
// }

// function NumberList(props) {
//     const numbers = props.numbers;
//     return (
//         <ul>
//             {numbers.map(number => (
//                 <ListItem key={number.toString()} value={number} />
//             ))}
//         </ul>
//     );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById("root")
// );

// class NameForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { value: "" };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleChange(event) {
//         this.setState({ value: event.target.value });
//     }

//     handleSubmit(event) {
//         this.state.value
//             ? alert("A name was submitted: " + this.state.value)
//             : alert("name null");
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         value={this.state.value}
//                         onChange={this.handleChange}
//                     />
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }
// ReactDOM.render(<NameForm />, document.getElementById("root"));

// class FlavorForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { value: "coconut" };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({ value: event.target.value });
//     }

//     handleSubmit(event) {
//         alert("Your favorite flavor is: " + this.state.value);
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     Pick your favorite flavor:
//                     <select
//                         value={this.state.value}
//                         onChange={this.handleChange}
//                     >
//                         <option value="grapefruit">Grapefruit</option>
//                         <option value="lime">Lime</option>
//                         <option value="coconut">Coconut</option>
//                         <option value="mango">Mango</option>
//                     </select>
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }
// ReactDOM.render(<FlavorForm />, document.getElementById("root"));

// class Reservation extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isGoing: true,
//             numberOfGuests: 2
//         };

//         this.handleInputChange = this.handleInputChange.bind(this);
//     }

//     handleInputChange(event) {
//         const target = event.target;
//         const value =
//             target.type === "checkbox" ? target.checked : target.value;
//         const name = target.name;

//         this.setState({
//             [name]: value
//         });
//     }

//     render() {
//         return (
//             <form>
//                 <label>
//                     Is going:
//                     <input
//                         name="isGoing"
//                         type="checkbox"
//                         checked={this.state.isGoing}
//                         onChange={this.handleInputChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Number of guests:
//                     <input
//                         name="numberOfGuests"
//                         type="number"
//                         value={this.state.numberOfGuests}
//                         onChange={this.handleInputChange}
//                     />
//                 </label>
//             </form>
//         );
//     }
// }
// ReactDOM.render(<Reservation />, document.getElementById("root"));

// function BoilingVerdict(props) {
//     if (props.celsius >= 100) {
//         return <p>The water would boil.</p>;
//     }
//     return <p>The water would not boil.</p>;
// }

// class Calculator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//         this.state = { temperature: "" };
//     }

//     handleChange(e) {
//         this.setState({ temperature: e.target.value });
//     }

//     render() {
//         const temperature = this.state.temperature;
//         return (
//             <fieldset>
//                 <legend>Enter temperature in Celsius:</legend>
//                 <input value={temperature} onChange={this.handleChange} />
//                 <BoilingVerdict celsius={parseFloat(temperature)} />
//             </fieldset>
//         );
//     }
// }
// ReactDOM.render(<Calculator />, document.getElementById("root"));

// const scaleNames = {
//     c: "Celsius",
//     f: "Fahrenheit"
// };

// function toCelsius(fahrenheit) {
//     return ((fahrenheit - 32) * 5) / 9;
// }

// function toFahrenheit(celsius) {
//     return (celsius * 9) / 5 + 32;
// }

// function tryConvert(temperature, convert) {
//     const input = parseFloat(temperature);
//     if (Number.isNaN(input)) return "";
//     const output = convert(input);
//     const rounded = Math.round(output * 1000) / 1000;
//     return rounded.toString();
// }

// function BoilingVerdict(props) {
//     if (props.celsius >= 100) {
//         return <p>The water would boil.</p>;
//     }
//     return <p>The water would not boil.</p>;
// }

// class TemperatureInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//     }
//     handleChange(e) {
//         this.props.onTemperatureChange(e.target.value);
//     }

//     render() {
//         const temperature = this.props.temperature;
//         const scale = this.props.scale;
//         return (
//             <fieldset>
//                 <legend>Enter temperature in {scaleNames[scale]}:</legend>
//                 <input value={temperature} onChange={this.handleChange} />
//             </fieldset>
//         );
//     }
// }

// class Calculator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
//         this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
//         this.state = { temperature: "", scale: "c" };
//     }
//     handleCelsiusChange(temperature) {
//         this.setState({ scale: "c", temperature });
//     }

//     handleFahrenheitChange(temperature) {
//         this.setState({ scale: "f", temperature });
//     }
//     render() {
//         const scale = this.state.scale;
//         const temperature = this.state.temperature;
//         const celsius =
//             scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
//         const fahrenheit =
//             scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

//         return (
//             <div>
//                 <TemperatureInput
//                     scale="c"
//                     temperature={celsius}
//                     onTemperatureChange={this.handleCelsiusChange}
//                 />
//                 <TemperatureInput
//                     scale="f"
//                     temperature={fahrenheit}
//                     onTemperatureChange={this.handleFahrenheitChange}
//                 />
//                 <BoilingVerdict celsius={parseFloat(celsius)} />
//                 <Button type="primary" icon="search">
//                     Search
//                 </Button>
//             </div>
//         );
//     }
// }
// ReactDOM.render(<Calculator />, document.getElementById("root"));

ReactDOM.render(<TodoList />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

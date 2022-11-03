//import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./BuyCoffee.json";
import ProgressBar1 from "./ProgressBar";

function App() {
  const [currentAcc, setCurrentAcc] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memo, setMemo] = useState([]);
  const [withadd, setWithAdd] = useState("");
  const [withAddAcc, setWithAddAcc] = useState("");
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState("");
  const [bgcolor, setbgColor] = useState("");

  const contractAddress = "0xB5F27Cf69E6913F50692978d1B66940CBb87Cff8";
  const ContractABI = abi.abi;

  /* Progress Bar*/
  const testData = [
    { bgcolor: "#048558", completed: 20 },
    // { bgcolor: "#00695c", completed: 50 },
    // { bgcolor: "#ef6c00", completed: 80 },
  ];

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install metamask");
      }
      setProgress("Wallet connecting ...");
      setCompleted(20);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setProgress("Wallet connected ...");
      setCompleted(50);
      if (accounts.length > 0) {
        setCurrentAcc(accounts[0]);
        setCompleted(100);
      }
    } catch (error) {
      setProgress(error.message);
      setbgColor("#ef6c00");
      setCompleted(100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setName(data.get("name"));
    setMessage(data.get("message"));
    setWithAdd(data.get("withadd"));

    console.log(name, message,withadd);
  };
  const onNameChange=async(e) =>{
    setName(e.target.value);
  }

  const onMessageChange=async(e) =>{
    setMessage(e.target.value);
  }

  const withChangeEvent= async(e) =>{
    setWithAdd(e.target.value);
    console.log(withadd);
  }

  const buyCoffee = async () => {
    try {
      const { ethereum } = window;

      console.log(name, message);
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cofContract = new ethers.Contract(
          contractAddress,
          ContractABI,
          signer
        );
        setProgress("tx mining ...");
        setbgColor("#ef6c00");
        setCompleted(20);
        console.log(cofContract);

        const cofTx = await cofContract.buyCoffee(
          name ? name : "Non",
          message ? message : "Enjoy your coffee",
          { value: ethers.utils.parseEther("0.001") }
        );
        setProgress("sending Tx..");
        setbgColor("#ef6c00");
        setCompleted(50);

        await cofTx.wait();
        getMemos();
        setProgress("tx processed successfuly ...");
        setbgColor("#ef6c00");
        setCompleted(100);
      }
    } catch (error) {
      setProgress(error.message);
      setbgColor("#048558");
      setCompleted(100);
    }
  };

  const buyLargeCoffee = async () => {
    try {
      const { ethereum } = window;

      console.log(name, message);
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cofContract = new ethers.Contract(
          contractAddress,
          ContractABI,
          signer
        );
        setProgress("tx mining ...");
        setbgColor("#ef6c00");
        setCompleted(20);
        console.log(cofContract);

        const cofTx = await cofContract.buyCoffee(
          name ? name : "Non",
          message ? message : "Enjoy your coffee",
          { value: ethers.utils.parseEther("0.003") }
        );
        setProgress("sending Tx..");
        setbgColor("#ef6c00");
        setCompleted(50);

        await cofTx.wait();
        getMemos();
        setProgress("tx processed successfuly ...");
        setbgColor("#ef6c00");
        setCompleted(100);
      }
    } catch (error) {
      setProgress(error.message);
      setbgColor("#048558");
      setCompleted(100);
    }
  };

  const changeWithdAdd = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cofContract = new ethers.Contract(
          contractAddress,
          ContractABI,
          signer
        );
        setProgress("tx mining ...");
        setbgColor("#ef6c00");
        setCompleted(20);
        console.log(withadd);

        const cofchAddTx = await cofContract.changeWithdrawlAdd(withadd);
        setProgress("sending Tx..");
        setbgColor("#ef6c00");
        setCompleted(50);

        await cofchAddTx.wait();
        console.log(await cofContract.owner());
        getMemos();
        setProgress("tx processed successfuly ...");
        setbgColor("#ef6c00");
        setCompleted(100);
      }
    } catch (error) {
      setProgress(error.code);
      setbgColor("#048558");
      setCompleted(100);
    }
  };

  const getMemos = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cofContract = new ethers.Contract(
          contractAddress,
          ContractABI,
          signer
        );
        setProgress("get Memos ...");
        setbgColor("#ef6c00");
        setCompleted(20);

        const memos = await cofContract.getMemos();
        setMemo(memos);
        setWithAddAcc(await cofContract.owner());
        console.log(await cofContract.owner());

        console.log(memos);
        if (memos.length > 0) {
          setProgress("Memos get successfuly ...");
          setbgColor("#ef6c00");
          setCompleted(100);
        } else {
        }
        setProgress("No Memos found ...");
        setbgColor("#ef6c00");
        setCompleted(100);
      }
    } catch (error) {
      setProgress(error.message);
      setbgColor("#048558");
      setCompleted(100);
    }
  };

  useEffect(() => {
    getMemos();
  }, []);

  return (
    <div className="ui  container">
      <h1 className="ui  header">Buy Me a Coffee..</h1>
      <br></br>

      <br></br>
      {currentAcc ? (
        <form className="ui large form" onSubmit={handleSubmit}>
          <div className="ui info message">
            <div className="header">Your connected Address is :</div>
            <p>{currentAcc}</p>
            <div className="header">Withdrawal Address :</div>
            <p>{withAddAcc}</p>
          </div>
          <div className="header">
            <div className="field">
              <label> Name</label>
              <input placeholder=" Name" name="name" onChange={onNameChange}/>
            </div>
            <div className="field">
              <label>Message</label>
              <textarea
                placeholder="Please put a massage..."
                rows="2"
                name="message"
                onChange={onMessageChange}
              ></textarea>
            </div>
            <button
              className="ui  fluid large linkedin button"
              onClick={buyCoffee}
            >
              Buy one Coffee for 0.001ETH
            </button>

            <p></p>
            <button
              className="ui fluid large linkedin button"
              onClick={buyLargeCoffee}
            >
              Buy Large Coffee for 0.003ETH
            </button>
            <p></p>
            </div>
            <div className="header">
            <div className="field">
              <label> Withdrawal Address</label>
              <input
                placeholder="Withdrawal Address start with 0x"
                name="withadd"
                required
                onChange={withChangeEvent}
              />
            </div>
            <button
              className="ui  fluid large facebook button"
              type="button"
              onClick={changeWithdAdd}
            >
              Update Withdrawal Address
            </button>
          </div>
          <div className="ui positive message">
            <div className="header">{progress ? progress : ""}</div>
          </div>
          {testData.map((item, idx) => {
            return (
              <ProgressBar1 key={idx} bgcolor={bgcolor} completed={completed} />
            );
          })}
        </form>
      ) : (
        <button
          className="ui  fluid huge facebook button"
          onClick={connectWallet}
        >
          Connect Wallet{" "}
        </button>
      )}

      {currentAcc &&
        memo.map((memo, idx) => {
          return (
            <div className="ui cards" key={idx}>
              <div className="ui green fluid card">
                <div className="content">
                  <div className="header" key={idx}>
                    {memo.message}
                  </div>
                  <div className="meta">{memo.timestamp.toString()}</div>
                  <div className="description">{memo.from}</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;

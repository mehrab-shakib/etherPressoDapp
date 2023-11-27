import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <>
      <h3 className="text-center mt-4 text-white">Transaction History</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped" style={{ backgroundColor: "#edc0fa", color: "#333" }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#ff914d" }} className="text-center">Name</th>
              <th style={{ backgroundColor: "#ff914d" }} className="text-center">Date</th>
              <th style={{ backgroundColor: "#ff914d" }} className="text-center">Message</th>
              <th style={{ backgroundColor: "#ff914d" }} className="text-center">From</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo) => (
              <tr key={Math.random()}>
                <td>{memo.name}</td>
                <td>{new Date(Number(memo.timestamp) * 1000).toLocaleString()}</td>
                <td>{memo.message}</td>
                <td>{memo.from}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Memos;

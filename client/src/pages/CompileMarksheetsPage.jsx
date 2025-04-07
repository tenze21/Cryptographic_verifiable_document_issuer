import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import {
  useGetUnCompiledNumberQuery,
  useCompileMarksheetsMutation,
} from "../slices/marksheetApiSlice";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { config } from "../wagmi_config";
import abi from "../contractAbi/abi.json";
import { toast } from "react-toastify";

function CompileMarksheetsPage() {
  // contract address: 0xF946e0b0263FEeEd5C163453c24AFc1E4C9905bA
  const { data: uncompiledNumber, refetch, isLoading } = useGetUnCompiledNumberQuery();
  const [compileMarksheets, { isLoading: loadingCompile }] =
    useCompileMarksheetsMutation();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const handleIssue = async () => {
    try {
      let res = await compileMarksheets().unwrap();
      // let merkleRoot = `0x${res.MerkleRoot}`;
      // console.log(res);
      
      writeContract({
        address: "0xF946e0b0263FEeEd5C163453c24AFc1E4C9905bA",
        abi: abi.abi,
        functionName: "issueDocuments",
        args: [`0x${res.MerkleRoot}`],
      });
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      config,
    });

    return (
      <div className="compile-marksheets">
        <Sidebar />
        <div className="content">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="marksheets-container">
              <h1 className="marksheets-title">
                {uncompiledNumber?.num ?? 0} Unissued Marksheets
              </h1>
              <article className="marksheets-article" aria-labelledby="issue-marksheets">
                <h3 id="issue-marksheets" className="marksheets-subtitle">
                  Click to issue marksheets
                </h3>
                <button
                  className="marksheets-button"
                  onClick={handleIssue}
                  disabled={loadingCompile || isPending}
                >
                  Issue Marksheets
                </button>
                {isConfirming && (
                  <p className="text-info">Waiting for confirmation...</p>
                )}
                {isConfirmed && (
                  <p className="text-success">Transaction confirmed.</p>
                )}
                {error && <p className="text-danger">{error.shortMessage}</p>}
              </article>
            </div>
          )}
        </div>
      </div>
    );
}
export default CompileMarksheetsPage;

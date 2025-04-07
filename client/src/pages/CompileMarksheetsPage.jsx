import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import {
  useGetUnCompiledNumberQuery,
  useCompileMarksheetsMutation,
  useUpdateMarksheeStatusMutation,
} from "../slices/marksheetApiSlice";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { config } from "../wagmi_config";
import abi from "../contractAbi/abi.json";
import { toast } from "react-toastify";
import { useState } from "react";

function CompileMarksheetsPage() {
  // contract address: 0xF946e0b0263FEeEd5C163453c24AFc1E4C9905bA
  const [issuedMarksheet, setIssuedMarksheet]= useState(false);
  const {
    data: uncompiledNumber,
    refetch,
    isLoading,
  } = useGetUnCompiledNumberQuery();
  const [compileMarksheets, { isLoading: loadingCompile }] =
    useCompileMarksheetsMutation();
  
  const [updateMarksheetStatus, {isLoading: loadingUpdate}]=useUpdateMarksheeStatusMutation();

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
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleUpdate= async()=>{
    try {
      let res= await updateMarksheetStatus().unwrap();
      refetch();
      setIssuedMarksheet(true);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      config,
    });

  return (
    <div className="compile-marksheets">
      <Sidebar />
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1>{uncompiledNumber.num} Unissued Marksheets.</h1>
            <article aria-labelledby="issue-marksheets">
              <h3 id="issue-marksheets">Click to issue marksheets.</h3>
              {isConfirmed  && !issuedMarksheet? (
                <button
                  onClick={handleUpdate}
                  disabled={loadingUpdate}
                >
                  Update Marksheets
                </button>
              ) : (
                <button
                  onClick={handleIssue}
                  disabled={loadingCompile || isPending || isConfirming}
                >
                  Issue Marksheets
                </button>
              )}
              {isConfirming && (
                <p className="text-info">Waiting for confirmation...</p>
              )}
              {isConfirmed && (
                <p className="text-success">Transaction confirmed. PLEASE UPDATE MARKSHEETS.</p>
              )}
              {error && <p className="text-danger">{error.shortMessage}</p>}
            </article>
          </>
        )}
      </div>
    </div>
  );
}
export default CompileMarksheetsPage;

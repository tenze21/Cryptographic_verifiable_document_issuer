import { useState } from "react";
import { FaFileCirclePlus } from "react-icons/fa6";
import {
  useValidateTargetHashMutation,
  useCheckMerkleRootOnChainMutation,
  useValidateMerkleRootMutation,
  useValidateSignatureMutation,
} from "../slices/MarksheetApiSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setMarksheet } from "../slices/marksheetSlice";
import { toast } from "react-toastify";
import VerificationLoader from "../components/VerificationLoader";

function HomePage() {
  const [error, setError] = useState("");
  const [validateTargetHash, { isLoading: loadingTargetHashValidation }] =
    useValidateTargetHashMutation();
  const [checkMerkleRootOnChain, { isLoading: loadingMerkleRootOnChain }] =
    useCheckMerkleRootOnChainMutation();
  const [validateMerkleRoot, { isLoading: loadingMerkleRootValidation }] =
    useValidateMerkleRootMutation();
  const [validateSignature, { isLoading: loadingSignatureValidation }] =
    useValidateSignatureMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const { message, data } = await validateTargetHash(file).unwrap();
        dispatch(setMarksheet(data));
      toast.success(message);
      const { message: rootvalidation } = await validateMerkleRoot({
        proof: data.proof,
        root: data.merkleRoot,
        targetHash: data.targetHash,
      }).unwrap();
      toast.success(rootvalidation);
      const { message: rootCheckOnChain } = await checkMerkleRootOnChain({
        merkleRoot: data.merkleRoot,
      }).unwrap();
      toast.success(rootCheckOnChain);
      const { message: signatureValidation } = await validateSignature({
        merkleRoot: data.merkleRoot,
        signature: data.signature,
      }).unwrap();
      toast.success(signatureValidation);
      
      navigate(`/marksheet`);
    } catch (err) {
      setError(err?.data?.message || err.error);
    }
  };

  return (
    <div className="file-upload mt-5 pe-5">
      <h1>
        Please Upload Your <code>.txt</code> Marksheet file In The Provided
        Field.
      </h1>
      <div className="form-field">
      <input
          type="file"
          accept=".txt"
          id="marksheet"
          onChange={handleFileUpload}
          disabled={loadingMerkleRootOnChain || loadingMerkleRootValidation || loadingSignatureValidation || loadingTargetHashValidation}
        />
        <label htmlFor="marksheet">
          {loadingTargetHashValidation ? (
            <div className="loader">
              <VerificationLoader variant="primary" />
              <p className="text-success">Verifying document hash.</p>
            </div>
          ) : loadingMerkleRootValidation ? (
            <div className="loader">
              <VerificationLoader variant="success" />
              <p className="text-success">Verifying document root.</p>
            </div>
          ) : loadingMerkleRootOnChain ? (
            <div className="loader">
              <VerificationLoader variant="danger" />
              <p className="text-success">Searching for document root onchain.</p>
            </div>
          ) : loadingSignatureValidation ? (
            <div className="loader">
              <VerificationLoader variant="warning" />
              <p className="text-success">Validating signature.</p>
            </div>
          ) : (
            <>
              <FaFileCirclePlus size={100} />
              <p>Drag & drop your marksheet file</p>
              <p className="or">or</p>
              <p className="select-btn">Select File</p>
              {error && (<p className="text-danger fs-5 fw-medium">{error}</p>)}
            </>
          )}
        </label>
      </div>
    </div>
  );
}
export default HomePage;

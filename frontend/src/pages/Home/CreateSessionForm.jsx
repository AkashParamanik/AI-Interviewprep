import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loaders/SpinnerLoader";
import axiosInstane from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, topicsToFocus, experience } = formData;
    if (!role || !topicsToFocus || !experience) {
      setError("Please fill all the required fields");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const aiResponse = await axiosInstane.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;
      const response = await axiosInstane.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      console.log(response.data?.session?._id);
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center  ">
      <h3 className="text-lg font-semibold  text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3 ">
        Fill out a few quick question and unlock your personalize set of
        Interview Q&A
      </p>
      <form
        onSubmit={handleCreateSession}
        action=""
        className="flex flex-col gap-3"
      >
        <Input
          value={formData.role}
          onChange={(e) => {
            handleChange("role", e.target.value);
          }}
          label="Target Role"
          placeholder="(eg. Frontend Developer, UI/UX Designer etc.)"
          type="text"
        />
        <Input
          value={formData.experience}
          onChange={(e) => {
            handleChange("experience", e.target.value);
          }}
          label="Yesrs of Experience"
          placeholder="(eg. 1Yr, 2Yrs, 5Yrs etc.)"
          type="number"
        />
        <Input
          value={formData.topicsToFocus}
          onChange={(e) => {
            handleChange("topicsToFocus", e.target.value);
          }}
          label="Topics To focus"
          placeholder="(Comma Separated eg. React Js, Node Js, MongoDB etc.)"
          type="text"
        />
        <Input
          value={formData.description}
          onChange={(e) => {
            handleChange("description", e.target.value);
          }}
          label="Description"
          placeholder="(Any Specific goals or notes for this session)"
          type="text"
        />
        {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full mt-2"
        >
          Create Session{isLoading && <SpinnerLoader />}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;

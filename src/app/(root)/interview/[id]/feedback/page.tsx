import Image from "next/image";
import { redirect } from "next/navigation";

import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "../../../../../../components/DisplayTechIcons";
import Agent from "../../../../../../components/Agent";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } =await  params;

  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      {/* Agent Component - interview session */}
      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
{/* Feedback Section */}
{feedback ? (
  <div className="bg-dark-100 p-6 rounded-lg space-y-4 mt-8">
    <h2 className="text-xl font-semibold">Your Interview Feedback</h2>

    {/* Total Score */}
    <div className="p-3 bg-gray-800 rounded-lg">
      <p className="text-lg font-medium">
        Total Score: <span className="text-green-400">{feedback.totalScore}/100</span>
      </p>
    </div>

    {/* Category Scores */}
    <div className="space-y-2">
      <h3 className="font-medium">Category Scores:</h3>
      {feedback.categoryScores.map((cat) => (
        <div key={cat.name} className="p-2 border border-gray-700 rounded-lg">
          <p>
            <strong>{cat.name}</strong>: {cat.score}/100
          </p>
          <p>{cat.comment}</p>
        </div>
      ))}
    </div>

    {/* Strengths */}
    <div className="space-y-2">
      <h3 className="font-medium">Strengths:</h3>
      <ul className="list-disc pl-5">
        {feedback.strengths.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Areas for Improvement */}
    <div className="space-y-2">
      <h3 className="font-medium">Areas for Improvement:</h3>
      <ul className="list-disc pl-5">
        {feedback.areasForImprovement.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Final Assessment */}
    <div>
      <h3 className="font-medium">Final Assessment:</h3>
      <p>{feedback.finalAssessment}</p>
    </div>
  </div>
) : (
  <p className="text-gray-400 mt-4">
    Feedback will be available once the AI analysis is completed.
  </p>
)}

    </div>
  );
};

export default InterviewDetails;

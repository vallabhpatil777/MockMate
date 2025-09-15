import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InterviewCard from '../../../components/InterviewCard'
import {  getInterviewByUserId, getLatestInterview } from '@/lib/actions/general.action'
import { getCurrentUser } from '@/lib/actions/auth.action'


const page = async () => {

  const user = await getCurrentUser();

  const [userInterviews ,latestInterview] = await Promise.all([

    await getInterviewByUserId( user?.id!),
    getLatestInterview({userId: user?.id!})
  ]);
 
  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterview?.length! > 0;


  return (
    <>
    <section className='card-cta bg-gradient-to-bl from-slate-50/50 via-white/30 to-white/50' >
      <div className='flex flex-col gap-6 max-w-lg'>
      <h2>Get Ready for AI Powered Mock Interview with Feedback</h2>
      <p className='text-muted-foreground'>Join MockMate today and take the first step towards acing your job interviews with confidence and get instant feedback</p>
      <Button asChild className='btn-primary max-sm:w-full'>
        <Link href='/interview'>Start an Interview</Link>
      </Button>
      </div>
      <Image src='/robot.png' alt='robot-dude' width={800} height={800} className='max-sm:hidden' />
    </section>



    <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interviews</h2>


      <div className='interviews-section'>
          {  
        hasPastInterviews ?( userInterviews?.map((interview) => (
          <InterviewCard {...interview} key={interview.id}/>
        ))) :(
        <p>You haven&apos;t taken any interviews yet</p> )
}
      </div>

      </section>
      <section className="flex flex-col gap-6 mt-8">
      <h2>Take an Interview</h2>

      <div className='interviews-section'>
      {  
        hasUpcomingInterviews ?( latestInterview?.map((interview) => (
          <InterviewCard {...interview} key={interview.id}/>
        ))) :(
        <p> There are no new interviews available.</p> )
}
      </div>

      </section>
    </>
  )
}

export default page
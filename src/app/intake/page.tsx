// deliverables/creator_catalyst/app/src/app/intake/page.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { FounderIntake, SprintPlan, CreatorArchetype, SprintTask } from '../../lib/matcher';
import { useRouter } from 'next/navigation';

const goals = [
  { id: 'awareness', name: 'Awareness', description: 'Get noticed by more people.' },
  { id: 'signups', name: 'Signups', description: 'Convert visitors into users.' },
  { id: 'revenue', name: 'Revenue', description: 'Increase sales and subscriptions.' },
  { id: 'community', name: 'Community', description: 'Build a loyal and engaged audience.' },
];

const budgets = [
  { id: 'under_5k', name: 'Under $5K', description: 'Exploring options' },
  { id: '5k_to_15k', name: '$5K - $15K', description: 'Ready for impactful campaigns' },
  { id: '15k_plus', name: '$15K+', description: 'Scaling for maximum reach' },
];

const platforms = ['twitter', 'linkedin', 'tiktok', 'youtube', 'newsletter'];

const Card: React.FC<{ id: string; name: string; description: string; selected: boolean; onClick: (id: string) => void }> = 
  ({ id, name, description, selected, onClick }) => (
    <div
      className={`p-6 border rounded-lg cursor-pointer transition-all duration-200
        ${selected ? 'border-indigo-500 bg-zinc-800 shadow-lg' : 'border-zinc-700 bg-zinc-900 hover:border-indigo-400'}`}
      onClick={() => onClick(id)}
    >
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );

export default function IntakePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FounderIntake>>({
    productName: '',
    productDescription: '',
    targetAudience: '',
    goal: undefined,
    budget: undefined,
    timeline: undefined,
    platforms: [],
  });
  const [sprintPlan, setSprintPlan] = useState<SprintPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (platform: 'twitter' | 'linkedin' | 'tiktok' | 'youtube' | 'newsletter') => {
    setFormData(prev => ({
      ...prev, 
      platforms: prev.platforms?.includes(platform) ? prev.platforms.filter(p => p !== platform) : [...(prev.platforms || []), platform]
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const validateStep1 = () => {
    if (!formData.productName || !formData.productDescription || !formData.targetAudience) {
      setError("Please fill in all fields for Step 1.");
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep2 = () => {
    if (!formData.goal || !formData.budget) {
      setError("Please select a goal and a budget.");
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep3 = () => {
    if (!formData.timeline || !formData.platforms || formData.platforms.length === 0) {
      setError("Please select a timeline and at least one platform.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/sprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate sprint plan.');
      }

      const data: SprintPlan = await response.json();
      setSprintPlan(data);
      nextStep(); // Move to results step
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ProgressIndicator = () => (
    <div className="flex justify-between w-full mb-8">
      {[1, 2, 3, 4].map(s => (
        <div key={s} className={`flex-1 text-center py-2 relative
          ${s <= step ? 'text-indigo-400' : 'text-zinc-600'}`}>
          Step {s}
          {s < 4 && (
            <div className={`absolute top-1/2 left-[calc(50%+1rem)] w-[calc(100%-2rem)] h-0.5 transform -translate-y-1/2
              ${s < step ? 'bg-indigo-500' : 'bg-zinc-700'}`}>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-zinc-900 rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Build Your Sprint Plan</h1>
        
        <ProgressIndicator />

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); if (validateStep1()) nextStep(); }}>
            <h2 className="text-2xl font-bold text-white mb-5">1. Tell us about your product</h2>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-zinc-300 text-sm font-bold mb-2">Product Name</label>
              <input type="text" id="productName" name="productName" value={formData.productName || ''} onChange={handleChange} 
                     className="shadow appearance-none border border-zinc-700 rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800"
                     placeholder="e.g., Creator Catalyst" required />
            </div>
            <div className="mb-4">
              <label htmlFor="productDescription" className="block text-zinc-300 text-sm font-bold mb-2">Product Description</label>
              <textarea id="productDescription" name="productDescription" value={formData.productDescription || ''} onChange={handleChange} 
                        className="shadow appearance-none border border-zinc-700 rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800 h-32"
                        placeholder="What does your product do?" required></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="targetAudience" className="block text-zinc-300 text-sm font-bold mb-2">Target Audience</label>
              <input type="text" id="targetAudience" name="targetAudience" value={formData.targetAudience || ''} onChange={handleChange} 
                     className="shadow appearance-none border border-zinc-700 rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800"
                     placeholder="e.g., indie hackers, ecom founders, B2B SaaS" required />
            </div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <div className="flex justify-end">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200">
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-5">2. What are your goals and budget?</h2>
            <div className="mb-6">
              <label className="block text-zinc-300 text-sm font-bold mb-3">Primary Goal:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map(g => (
                  <Card key={g.id} id={g.id} name={g.name} description={g.description}
                        selected={formData.goal === g.id} onClick={(id) => setFormData(prev => ({ ...prev, goal: id as FounderIntake['goal'] }))} />
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-zinc-300 text-sm font-bold mb-3">Budget Range:</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgets.map(b => (
                  <Card key={b.id} id={b.id} name={b.name} description={b.description}
                        selected={formData.budget === b.id} onClick={(id) => setFormData(prev => ({ ...prev, budget: id as FounderIntake['budget'] }))} />
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200">
                Back
              </button>
              <button type="button" onClick={() => { if (validateStep2()) nextStep(); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200">
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-white mb-5">3. Set your timeline and platforms</h2>
            <div className="mb-6">
              <label className="block text-zinc-300 text-sm font-bold mb-3">Sprint Timeline:</label>
              <div className="flex flex-wrap gap-4">
                {[ {id: '2_weeks', name: '2 Weeks'}, {id: '1_month', name: '1 Month'}, {id: '3_months', name: '3 Months'} ].map(t => (
                  <button type="button" key={t.id}
                          className={`py-2 px-4 rounded-full border transition-all duration-200
                            ${formData.timeline === t.id ? 'border-indigo-500 bg-indigo-900 text-white' : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-indigo-400'}`}
                          onClick={() => setFormData(prev => ({ ...prev, timeline: t.id as FounderIntake['timeline'] }))}>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-zinc-300 text-sm font-bold mb-3">Target Platforms:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {platforms.map(p => (
                  <div key={p} className="flex items-center">
                    <input type="checkbox" id={p} name="platforms" value={p} 
                           checked={formData.platforms?.includes(p as 'twitter')} onChange={() => handlePlatformChange(p as 'twitter')} 
                           className="form-checkbox h-5 w-5 text-indigo-600 bg-zinc-800 border-zinc-600 rounded focus:ring-indigo-500" />
                    <label htmlFor={p} className="ml-3 text-zinc-300 capitalize">{p}</label>
                  </div>
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200">
                Back
              </button>
              <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Generating...' : 'Generate My Sprint Plan'}
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Your Creator Catalyst Sprint Plan!</h2>
            {sprintPlan ? (
              <div className="text-zinc-300">
                <p className="mb-4 text-lg"><strong className="text-white">Product Name:</strong> {sprintPlan.productName}</p>
                <p className="mb-4 text-lg"><strong className="text-white">Sprint Duration:</strong> {sprintPlan.sprintDuration}</p>
                <p className="mb-4 text-lg"><strong className="text-white">Estimated Investment:</strong> {sprintPlan.estimatedInvestment}</p>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Recommended Creator Archetypes:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {sprintPlan.recommendedArchetypes.map((archetype, index) => (
                      <div key={index} className="bg-zinc-800 p-5 rounded-lg border border-zinc-700">
                        <h4 className="text-xl font-bold text-indigo-300 mb-2">{archetype.name}</h4>
                        <p className="text-zinc-400 mb-1 text-sm">{archetype.description}</p>
                        <p className="text-zinc-500 text-xs">Best for: {archetype.bestFor}</p>
                        <p className="text-zinc-500 text-xs">Platforms: {archetype.platforms.join(', ')}</p>
                        <p className="text-zinc-500 text-xs">Estimated Reach: {archetype.estimatedReach}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Sprint Tasks:</h3>
                  <div className="space-y-4">
                    {sprintPlan.tasks.map((task, index) => (
                      <div key={index} className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 flex items-start">
                        <div className="w-8 h-8 flex-shrink-0 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {task.week}
                        </div>
                        <div>
                          <p className="text-white font-medium">{task.task}</p>
                          <p className="text-zinc-400 text-sm">Owner: <span className="capitalize">{task.owner}</span> | Deliverable: {task.deliverable}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">Success Metrics:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {sprintPlan.successMetrics.map((metric, index) => (
                      <li key={index} className="text-zinc-300 text-lg">{metric}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-xl text-indigo-400 font-bold mt-8 text-center">
                  <a href="#" className="hover:underline">{sprintPlan.nextStep}</a>
                </p>

              </div>
            ) : (
              <p className="text-center text-zinc-400">No sprint plan generated yet. Please complete the form.</p>
            )}
            <div className="flex justify-center mt-8">
              <button type="button" onClick={() => { setStep(1); setSprintPlan(null); setFormData({
                productName: '',
                productDescription: '',
                targetAudience: '',
                goal: undefined,
                budget: undefined,
                timeline: undefined,
                platforms: [],
              }); }} className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200">
                Start New Plan
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-xs italic text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

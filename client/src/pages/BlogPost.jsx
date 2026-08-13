import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog post data (in real app, fetch from API)
  const posts = {
    1: {
      title: '10 Tips for Successful Online Learning',
      author: 'Dr. Sarah Johnson',
      date: 'August 10, 2026',
      category: 'Learning Tips',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop',
      content: `
        <h2>Introduction</h2>
        <p>Online learning has become an essential part of education. Whether you're a student or professional, these tips will help you succeed in your online learning journey.</p>
        
        <h2>1. Create a Dedicated Study Space</h2>
        <p>Set up a quiet, organized space specifically for learning. This helps your brain associate the environment with focus and productivity.</p>
        
        <h2>2. Set Clear Goals</h2>
        <p>Define what you want to achieve each week. Break down larger goals into manageable tasks to stay motivated and track progress.</p>
        
        <h2>3. Establish a Routine</h2>
        <p>Consistency is key. Set specific times for studying, breaks, and review sessions. A routine helps build discipline and reduces procrastination.</p>
        
        <h2>4. Stay Connected</h2>
        <p>Engage with instructors and fellow students through discussion forums, study groups, and virtual meetups. Collaboration enhances learning.</p>
        
        <h2>5. Take Regular Breaks</h2>
        <p>Use techniques like the Pomodoro method (25 minutes of focus, 5-minute breaks) to maintain concentration and avoid burnout.</p>
        
        <h2>6. Use Multiple Resources</h2>
        <p>Don't rely solely on course materials. Explore supplementary resources like videos, articles, and podcasts to deepen understanding.</p>
        
        <h2>7. Practice Active Learning</h2>
        <p>Take notes, ask questions, and apply what you learn through projects and exercises. Active engagement improves retention.</p>
        
        <h2>8. Stay Organized</h2>
        <p>Keep track of deadlines, assignments, and materials using calendars, to-do lists, or project management tools.</p>
        
        <h2>9. Seek Feedback</h2>
        <p>Regularly ask for feedback from instructors and peers. Constructive criticism helps you improve and grow.</p>
        
        <h2>10. Celebrate Progress</h2>
        <p>Acknowledge your achievements, no matter how small. Celebrating progress keeps you motivated and positive.</p>
      `
    },
    2: {
      title: 'The Future of Education: AI in the Classroom',
      author: 'Prof. Michael Chen',
      date: 'August 5, 2026',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
      content: `
        <h2>Introduction</h2>
        <p>Artificial Intelligence is revolutionizing education, offering personalized learning experiences and transforming traditional teaching methods.</p>
        
        <h2>Personalized Learning</h2>
        <p>AI algorithms can adapt to individual learning styles, pace, and preferences, creating customized learning paths for each student.</p>
        
        <h2>Intelligent Tutoring Systems</h2>
        <p>AI-powered tutors provide real-time feedback, identify knowledge gaps, and offer targeted exercises to reinforce understanding.</p>
        
        <h2>Automated Assessment</h2>
        <p>AI can grade assignments, provide instant feedback, and analyze student performance patterns to improve instruction.</p>
        
        <h2>Predictive Analytics</h2>
        <p>AI helps identify students at risk of falling behind, enabling timely intervention and support to keep everyone on track.</p>
        
        <h2>Challenges and Considerations</h2>
        <p>While AI offers immense potential, we must address concerns about data privacy, algorithmic bias, and the importance of human connection in education.</p>
      `
    }
    // Add more posts as needed
  };

  const post = posts[id];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-white w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-medium bg-blue-600 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div 
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Share this post:</span>
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Award, Code, GraduationCap, ChevronsDown, Sparkles, BrainCircuit, X } from 'lucide-react';

// --- Mock Data ---
const portfolioData = {
  name: "Pranesh Kumar C",
  title: "AWS Data Engineer",
  contact: {
    email: "praneshc2004btc@gmail.com",
    phone: "+91 6369995300",
    linkedin: "www.linkedin.com/in/pranesh-kumar-c-58298924a",
    github: "https://github.com/praneshkumarc",
  },
  summary: "A results-driven AWS Certified Data Engineer with a passion for building scalable data pipelines and robust cloud infrastructure. Proficient in Java and Python, with hands-on experience in designing and deploying highly available, automated solutions on AWS. Adept at leveraging soft skills like agile development and team collaboration to deliver high-quality projects.",
  education: {
    degree: "Bachelor of Technology in Computer Science",
    university: "Amrita Vishwa Vidyapeetham, Coimbatore",
    years: "2022 – 2026",
    cgpa: "6.19 / 10.0"
  },
  skills: {
    "Programming": ["Java", "Python", "SQL", "Shell Scripting"],
    "Cloud & Data Engineering": ["AWS (S3, EC2, Redshift, Glue, Lambda, RDS, Athena, Kinesis)", "ETL/ELT", "Data Warehousing", "Data Modeling", "Data Lake Architecture"],
    "Web Development": ["React.js", "Node.js", "Express.js", "Tailwind CSS", "Redux", "RESTful APIs"],
    "DevOps & CI/CD": ["Docker", "Kubernetes (EKS)", "AWS CodePipeline", "Jenkins", "GitHub Actions", "Git"],
    "Databases": ["MongoDB", "Mongoose", "Amazon RDS"],
    "Monitoring & Security": ["CloudWatch", "IAM", "VPC"],
    "Soft Skills": ["Agile Development", "Problem Solving", "Team Collaboration", "Communication"]
  },
  certifications: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", id: "cloud-practitioner" },
    { name: "Generative AI Engineering with LLMs", issuer: "Coursera (Educator: IBM)", id: "gen-ai-eng" },
    { name: "AWS Cloud Solutions Architect", issuer: "Coursera (Educator: AWS)", id: "coursera-sa" },
    { name: "AWS Academy Data Engineering Badge", issuer: "AWS Academy", id: "aws-academy-data-badge" }
  ],
  projects: [
    {
      title: "Full CI/CD Pipeline with AWS Developer Tools",
      category: "Cloud Engineering",
      description: "Implemented a complete, automated CI/CD pipeline on AWS to streamline application delivery. The pipeline automates the build, testing, and deployment phases, significantly reducing manual intervention and accelerating release cycles. This setup ensures consistent and reliable deployments.",
      elaboration: [
        "**Source Control:** Utilized AWS CodeCommit as a secure, git-based repository for the application source code.",
        "**Build & Test:** Configured AWS CodeBuild to automatically compile the source code, run unit tests (using Jest), and produce build artifacts. A buildspec.yml file defined the build commands and dependencies.",
        "**Deployment:** Leveraged AWS CodeDeploy to automate the deployment of the application to a fleet of EC2 instances. Implemented deployment strategies like in-place and blue/green to minimize downtime.",
        "**Orchestration:** Integrated all services using AWS CodePipeline, which orchestrated the entire workflow from code commit to production deployment, providing full visibility into the release process."
      ],
      tags: ["AWS CodePipeline", "CodeCommit", "CodeBuild", "CodeDeploy", "EC2", "IAM"]
    },
    {
      title: "Highly Available & Auto-Scaling Web Application",
      category: "Cloud Architecture",
      description: "Designed and deployed a fault-tolerant, highly available web application on AWS capable of automatically scaling to meet traffic demands. The architecture ensures high uptime and consistent performance, even during peak loads or in the event of an infrastructure failure.",
      elaboration: [
        "**Load Balancing:** An Application Load Balancer (ALB) was placed at the front to distribute incoming traffic across multiple targets in different Availability Zones (AZs), eliminating single points of failure.",
        "**Auto Scaling:** An Auto Scaling Group (ASG) was configured to automatically launch or terminate EC2 instances based on predefined CloudWatch alarms (e.g., CPU utilization). This ensures optimal resource usage and cost-efficiency.",
        "**Database:** Utilized Amazon RDS with a Multi-AZ deployment configuration. This creates a synchronous standby replica in a different AZ, providing automatic failover in case the primary database instance fails.",
        "**Stateless Application:** The EC2 instances were configured to be stateless, with session data offloaded to a distributed cache service like ElastiCache (Redis), allowing any instance to handle any request."
      ],
      tags: ["EC2", "Auto Scaling", "ELB", "RDS Multi-AZ", "VPC", "CloudWatch"]
    },
    {
      title: "Containerized App with Blue/Green Deployment on ECS",
      category: "DevOps & Containers",
      description: "Built a containerized application using Docker and deployed it on Amazon ECS with an automated blue/green deployment strategy. This advanced deployment method allows for zero-downtime releases by safely shifting traffic to a new application version after validation.",
      elaboration: [
        "**Containerization:** The application was packaged into a lightweight, portable Docker container, ensuring consistency across development, testing, and production environments.",
        "**Orchestration:** Amazon Elastic Container Service (ECS) was used to manage and orchestrate the Docker containers. An ECS Task Definition specified the container image, CPU/memory allocation, and networking.",
        "**Blue/Green with CodeDeploy:** AWS CodeDeploy was configured to manage the deployment process. It provisions a new set of containers (the 'green' environment) with the updated application version alongside the existing 'blue' environment.",
        "**Traffic Shifting:** After the green environment is verified through automated tests (e.g., Lambda functions checking an endpoint), CodeDeploy safely shifts 100% of the production traffic from the blue to the green environment via the Application Load Balancer's listener rules. The old blue environment is kept on standby for quick rollbacks before being terminated."
      ],
      tags: ["ECS", "Docker", "AWS CodeDeploy", "Fargate", "ALB", "CI/CD"]
    },
     {
      title: "EC2 in Private Subnet with Secure Internet Access",
      category: "Cloud Security",
      description: "Established a secure network architecture where an EC2 instance in a private subnet can access the internet for updates and API calls without being publicly exposed. This was achieved using an OpenVPN server as a bastion host and a NAT Gateway for outbound traffic.",
      elaboration: [
        "**VPC Setup:** A VPC was created with two subnets: one public and one private. The public subnet had a route to an Internet Gateway (IGW).",
        "**Bastion Host:** An OpenVPN server was deployed on a small EC2 instance in the public subnet. This server acted as a secure gateway, allowing authenticated developers to SSH into the private EC2 instance.",
        "**Private Instance:** The main application EC2 instance was placed in the private subnet, which has no direct route to the IGW, protecting it from inbound internet traffic.",
        "**Outbound Access:** A NAT Gateway was provisioned in the public subnet. The private subnet's route table was configured to direct all internet-bound traffic (0.0.0.0/0) to the NAT Gateway, allowing the private instance to fetch software updates and connect to external services securely."
      ],
      tags: ["VPC", "Subnets", "NAT Gateway", "OpenVPN", "Security Groups", "EC2"]
    },
    {
      title: "Crypto Price Tracking App",
      category: "Web Development",
      description: "Developed a dynamic web application that fetches real-time cryptocurrency market data using the CoinGecko API. Features include live price updates, percentage changes, and market trends with a responsive UI.",
      tags: ["React.js", "CoinGecko API", "Tailwind CSS", "WebSockets"],
      link: "#"
    },
    {
      title: "Responsive Portfolio with Advanced Animations",
      category: "Web Development",
      description: "Built a personal portfolio using React.js and Tailwind CSS. Integrated responsive design to ensure a seamless experience across all devices.",
      tags: ["React.js", "Tailwind CSS", "Responsive Design"],
      link: "#"
    }
  ]
};

// --- Main Sections ---

const Hero = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-700/20 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-500 pb-2">{portfolioData.name}</h1>
        <p className="text-xl md:text-2xl text-gray-300 mt-4">{portfolioData.title}</p>
        <p className="max-w-3xl mx-auto mt-6 text-gray-400">{portfolioData.summary}</p>
        <div className="flex justify-center space-x-6 mt-8">
          <a href={`http://${portfolioData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-300 transition-colors duration-300"><Linkedin size={28} /></a>
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-300 transition-colors duration-300"><Github size={28} /></a>
          <a href={`mailto:${portfolioData.contact.email}`} className="text-gray-400 hover:text-teal-300 transition-colors duration-300"><Mail size={28} /></a>
          <a href={`tel:${portfolioData.contact.phone}`} className="text-gray-400 hover:text-teal-300 transition-colors duration-300"><Phone size={28} /></a>
        </div>
      </div>
      <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group">
        <span className="text-sm text-gray-500 group-hover:text-teal-300 transition-colors">Scroll Down</span>
        <ChevronsDown className="w-6 h-6 text-gray-500 animate-bounce mt-1 group-hover:text-teal-300 transition-colors"/>
      </a>
    </section>
  );
};

const About = () => {
    return (
        <section id="about" className="py-24 bg-gray-800/50">
            <div className="container mx-auto px-8 max-w-5xl">
                <h2 className="text-4xl font-bold text-center text-white mb-12">About Me</h2>
                <div className="text-lg text-gray-300 leading-relaxed space-y-6 text-center">
                    <p>I am a dedicated and certified AWS Data Engineer with a strong foundation in computer science and a specialization in Java. My journey into the cloud began with a fascination for how data, when properly managed and architected, can drive innovation and business value. I thrive on designing and implementing scalable, secure, and efficient data solutions on the AWS platform.</p>
                    <p>Beyond technical skills, I am a firm believer in the power of collaboration and communication. I excel in agile environments, working closely with cross-functional teams to solve complex problems and deliver projects that exceed expectations. My goal is to continuously learn and apply cutting-edge technologies to build the next generation of data infrastructure.</p>
                </div>
            </div>
        </section>
    );
};

const Skills = () => (
  <section id="skills" className="py-24 bg-gray-900">
    <div className="container mx-auto px-8">
      <h2 className="text-4xl font-bold text-center text-white mb-16">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(portfolioData.skills).map(([category, skillsList]) => (
          <div key={category} className="bg-gray-800 p-6 rounded-lg border border-gray-700/50 shadow-lg hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">{category}</h3>
            <ul className="space-y-2">
              {skillsList.map(skill => ( <li key={skill} className="text-gray-300 flex items-center"><Code size={16} className="mr-3 text-teal-500 flex-shrink-0" />{skill}</li> ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Certifications = () => (
  <section id="certifications" className="py-24 bg-gray-800/50">
    <div className="container mx-auto px-8 max-w-4xl">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Certifications</h2>
      <div className="space-y-6">
        {portfolioData.certifications.map(cert => (
            <div key={cert.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700/50 flex items-center space-x-6 hover:bg-gray-700/70 transition-colors duration-300">
              <div className="bg-teal-500/10 p-3 rounded-full"><Award size={28} className="text-teal-400" /></div>
              <div><h3 className="text-xl font-semibold text-white">{cert.name}</h3><p className="text-gray-400">{cert.issuer}</p></div>
            </div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project }) => {
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleExplain = async () => {
        if (explanation) { // Toggle off
            setExplanation('');
            return;
        }
        setIsLoading(true);
        setError('');
        const techDetails = project.elaboration ? project.elaboration.join(' ') : project.description;
        const prompt = `Explain the following project like I'm 5 years old, using a simple analogy. Project Title: "${project.title}". Technical Details: "${techDetails}". Keep it short and easy to understand.`;
        
        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API call failed: ${response.status}`);

            const result = await response.json();
            if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                setExplanation(result.candidates[0].content.parts[0].text);
            } else {
                throw new Error("Invalid API response structure.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg flex flex-col hover:shadow-teal-500/20 hover:-translate-y-2 transition-all duration-300">
            <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors"><ExternalLink size={24} /></a>}
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-4">{project.category}</p>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                
                {project.elaboration && <div className="space-y-3 text-gray-300 mb-6"><h4 className="font-semibold text-gray-200">Technical Details:</h4>{project.elaboration.map((point, i) => (<p key={i} dangerouslySetInnerHTML={{ __html: point }} className="text-sm leading-relaxed"></p>))}</div>}
                
                <div className="mt-auto">
                    <div className="mb-6">
                        <button onClick={handleExplain} disabled={isLoading} className="text-sm bg-teal-500/10 text-teal-300 font-semibold py-2 px-4 rounded-lg hover:bg-teal-500/20 transition-all duration-300 flex items-center gap-2 disabled:opacity-50">
                            <Sparkles size={16} />
                            {isLoading ? 'Thinking...' : (explanation ? 'Hide Explanation' : "✨ Explain Like I'm 5")}
                        </button>
                        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                        {explanation && <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-teal-500/20"><p className="text-gray-300 italic">{explanation}</p></div>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => <span key={tag} className="bg-gray-700 text-teal-300 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
};


const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-gray-900">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => (
    <section id="education" className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-8 max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Education</h2>
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700/50 flex items-center space-x-6 hover:bg-gray-700/70 transition-colors duration-300">
                <div className="bg-teal-500/10 p-4 rounded-full"><GraduationCap size={32} className="text-teal-400" /></div>
                <div>
                    <h3 className="text-2xl font-bold text-white">{portfolioData.education.degree}</h3>
                    <p className="text-lg text-gray-300 mt-1">{portfolioData.education.university}</p>
                    <p className="text-gray-400 mt-2">{portfolioData.education.years}</p>
                    <p className="text-gray-400 mt-1">CGPA: {portfolioData.education.cgpa}</p>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 py-12">
    <div className="container mx-auto px-8 text-center text-gray-500">
      <p className="mb-4">Designed & Built by {portfolioData.name}</p>
      <div className="flex justify-center space-x-6 mb-4">
        <a href={`http://${portfolioData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors"><Linkedin size={24} /></a>
        <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors"><Github size={24} /></a>
        <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-teal-300 transition-colors"><Mail size={24} /></a>
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
    </div>
  </footer>
);


// --- Main App Component ---

export default function App() {
  
  useEffect(() => {
    // Add smooth scrolling behavior to the page
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      // Clean up style on component unmount
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return (
    <div className="bg-gray-900 font-sans antialiased">
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Education />
      </main>
      <Footer />
    </div>
  );
}

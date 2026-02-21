import { IoClose } from "react-icons/io5";
import { ProjectData } from "../constants/projectData";
import { BsGithub, BsGlobe, BsPencilSquare } from "react-icons/bs";
import { SiFigma, SiNotion } from "react-icons/si";

// Modal
export const ProjectModal = ({ project, onClose }: { project: ProjectData | null; onClose: () => void }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#EFECE3] p-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-2xl font-bold">{project.title} Links</h3>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition">
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-3">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition group">
              <BsGithub size={24} className="group-hover:scale-110 transition" />
              <span className="font-semibold text-lg">GitHub Repository</span>
            </a>
          )}
          {project.links.deploy && (
            <a href={project.links.deploy} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#BF092F] hover:bg-[#BF092F]/5 transition group">
              <BsGlobe size={24} className="text-[#BF092F] group-hover:scale-110 transition" />
              <span className="font-semibold text-lg text-[#BF092F]">Live Demo Site</span>
            </a>
          )}
          {project.links.notion && (
            <a href={project.links.notion} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition group">
              <SiNotion size={24} className="group-hover:scale-110 transition" />
              <span className="font-semibold text-lg">Notion Docs</span>
            </a>
          )}
          {project.links.blog && (
            <a href={project.links.blog} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:bg-green-50 transition group">
              <BsPencilSquare size={24} className="group-hover:scale-110 transition text-green-600" />
              <span className="font-semibold text-lg">Dev Blog</span>
            </a>
          )}
          {project.links.figma && (
            <a href={project.links.figma} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-600 hover:bg-purple-50 transition group">
              <SiFigma size={24} className="group-hover:scale-110 transition text-purple-600" />
              <span className="font-semibold text-lg">Figma Design</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
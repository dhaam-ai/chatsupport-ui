import React, { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';

export interface Agent {
  id?: string;
  agent_id?: string;
  avatar?: string;
  name: string;
  role: string;
  team: string;
  email: string;
  phone?: string;
  status: string;
  ticketsClosed: number;
  avgResponseTime: string;
  [key: string]: any;
}

export interface AgentTableProps {
  agents: Agent[];
  filteredAgents: Agent[];
  loading: boolean;
  limit: number;
  densityClasses: string;
  selectedAgents: Set<string>;
  agentActiveState: Record<string, boolean>;
  getStatusColor: (status: string) => string;
  onSelectAgent: (id: string) => void;
  onSelectAll: () => void;
  onAgentClick?: (id: string) => void;
  onStatusChange?: (agentId: string, newStatus: string) => Promise<boolean>;
  onDelete?: (agentId: string) => Promise<boolean>;
  onEdit?: (agentId: string) => void;
  onBlock?: (agentId: string) => void;
  onToggleActive?: (agentId: string, isActive: boolean) => Promise<boolean>;
}

const AgentTable: React.FC<AgentTableProps> = ({
  agents,
  loading,
  limit,
  densityClasses,
  selectedAgents,
  agentActiveState,
  filteredAgents,
  getStatusColor,
  onSelectAgent,
  onSelectAll,
  onAgentClick,
  onStatusChange,
  onDelete,
  onEdit,
  onBlock,
  onToggleActive,
}) => {
  const [pendingUpdates, setPendingUpdates] = useState<Set<string>>(new Set());
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; agent: Agent | null }>({
    isOpen: false,
    agent: null,
  });

  useEffect(() => {
    filteredAgents.forEach((agent) => {
      const agentId = agent.id || agent.agent_id || '';
      if (!(agentId in agentActiveState)) {
        // Initialize if not already set
      }
    });
  }, [filteredAgents]);

  const handleToggleActive = async (agent: Agent, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const agentId = agent.id || agent.agent_id || '';
    
    if (onToggleActive) {
      setPendingUpdates(prev => new Set(prev).add(agentId));
      const success = await onToggleActive(agentId, !agentActiveState[agentId]);
      setPendingUpdates(prev => {
        const next = new Set(prev);
        next.delete(agentId);
        return next;
      });
    }
  };

  const handleDeleteClick = (agent: Agent) => {
    setDeleteModal({ isOpen: true, agent });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.agent && onDelete) {
      const agentId = deleteModal.agent.id || deleteModal.agent.agent_id || '';
      const success = await onDelete(agentId);
      if (success) {
        setDeleteModal({ isOpen: false, agent: null });
      }
    }
  };

  if (loading) {
    return (
      <div className="overflow-x-auto max-h-[calc(100vh-350px)] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-purple-100/80 to-indigo-100/80 backdrop-blur-sm border-b border-purple-200/50">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <input type="checkbox" disabled className="w-4 h-4 rounded border-gray-400" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Team</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Tickets</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Avg. Response</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Active</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array(limit).fill(0).map((_, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                {Array(11).fill(0).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto max-h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar" style={{ overflowX: 'hidden' }}>
        <table className="min-w-full divide-y divide-gray-200/50">
          <thead className="bg-gradient-to-r from-purple-100/80 to-indigo-100/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <input
                  type="checkbox"
                  style={{ accentColor: '#7c43df' }}
                  checked={selectedAgents.size === filteredAgents.length && filteredAgents.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-gray-400 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Team</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Tickets</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">Avg. Response</th>
              <th style={{ paddingLeft: '43px' }} className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                Active
              </th>
              <th style={{ paddingLeft: '43px' }} className="px-4 py-3 text-left text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200">
            {filteredAgents.map((agent) => (
              <tr
                key={agent.id}
                className="border-b border-gray-200 hover:bg-white hover:border-t-[1px] cursor-pointer hover:border-gray-200 hover:shadow-[0_-5px_7px_-1px_rgba(0,0,0,0.1),0_5px_7px_-1px_rgba(0,0,0,0.1)] hover:z-10 relative transition-all duration-200 ease-in-out"
                onClick={() => onAgentClick?.(agent.id ?? '')}
                id={`agent-row-${agent.id}`}
              >
                <td className={`px-4 ${densityClasses}`} onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedAgents.has(agent.id ?? '')}
                    onChange={() => onSelectAgent(agent.id ?? '')}
                    className="w-4 h-4 rounded border-gray-400 accent-[#7c43df] cursor-pointer transition-colors"
                  />
                </td>
                <td className={`px-4 ${densityClasses}`}>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={agent.avatar}
                        className="w-10 h-10 rounded-full shadow-md object-cover ring-2 ring-purple-100 group-hover:ring-purple-300 transition-all"
                        alt={`${agent.name}'s avatar`}
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="font-semibold transition-colors" style={{ color: '#2b2b2b' }}>
                        {agent.name}
                      </div>
                      <div className="text-xs" style={{ color: '#2b2b2b' }}>
                        {agent.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-4 ${densityClasses} text-sm font-medium pb-[2px] hover:underline`} style={{ color: '#2b2b2b' }}>
                  {agent.role}
                </td>
                <td className={`px-4 ${densityClasses} text-xs font-medium`} style={{ color: '#2b2b2b' }}>
                  <div className="flex text-[14px] font-medium items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {agent.email}
                  </div>
                </td>
                <td className={`px-4 ${densityClasses} text-xs font-medium`} style={{ color: '#2b2b2b' }}>
                  <div className="flex text-[13px] font-medium items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {agent.phone}
                  </div>
                </td>
                <td className={`px-4 ${densityClasses} text-sm font-medium`} style={{ color: '#2b2b2b' }}>
                  {agent.team}
                </td>
                <td className={`px-4 ${densityClasses}`}>
                  <span className={`px-2 py-0.5 rounded-full text-[14px] font-bold tracking-wider shadow-sm ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </td>
                <td className={`px-4 ${densityClasses}`}>
                  <span className="font-bold" style={{ color: '#2b2b2b' }}>
                    {agent.ticketsClosed}
                  </span>
                  <div className="text-xs" style={{ color: '#2b2b2b' }}>
                    Tickets
                  </div>
                </td>
                <td className={`px-4 ${densityClasses} text-sm font-medium`} style={{ color: '#2b2b2b' }}>
                  {agent.avgResponseTime}
                </td>

                {/* Toggle Column */}
                <td className={`px-4 ${densityClasses}`} onClick={(e) => e.stopPropagation()}>
                  {onToggleActive && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agentActiveState[agent.id || ''] || false}
                        disabled={pendingUpdates.has(agent.id || '')}
                        onChange={(e) => handleToggleActive(agent, e)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-11 h-6 bg-gray-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 ${
                          pendingUpdates.has(agent.id || '') ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      ></div>
                    </label>
                  )}
                </td>

                {/* Actions Column */}
                <td className={`px-4 ${densityClasses}`}>
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(agent.id ?? '');
                        }}
                        className="p-1.5 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        style={{ color: '#2b2b2b' }}
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                          <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                    )}

                    {onBlock && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBlock(agent.id ?? '');
                        }}
                        className="p-1.5 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        style={{ color: '#2b2b2b' }}
                        title="Block"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                        </svg>
                      </button>
                    )}

                    {onDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(agent);
                        }}
                        className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        style={{ color: '#2b2b2b' }}
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold mb-2">Delete Agent</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{deleteModal.agent?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal({ isOpen: false, agent: null })}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentTable;

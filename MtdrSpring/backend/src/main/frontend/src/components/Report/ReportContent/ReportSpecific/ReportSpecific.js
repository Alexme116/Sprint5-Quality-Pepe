import './ReportSpecific.css';
import { useState, useEffect } from 'react';
import ReportKPI from '../ReportKPI/ReportKPI';

export default function ReportSpecific({ data, moduleData }) {
    const [teamFilter, setTeamFilter] = useState('default');
    const [memberFilter, setMemberFilter] = useState('all');
    const [sprintFilter, setSprintFilter] = useState('all');
    const [teamsAvailable, setTeamsAvailable] = useState([]);
    const [membersAvailable, setMembersAvailable] = useState([]);

    useEffect(() => {
        if (teamFilter != 'default') {
            const uniqueMembers = new Set(
                data
                .filter(item => item.teamId == teamFilter)
                .map(item => item.user.username)
            );
            setMembersAvailable(Array.from(uniqueMembers));
        } else {
            setMembersAvailable([]);
            setMemberFilter('all');
            setSprintFilter('all');
        }
    }, [teamFilter]);

    useEffect(() => {
        if (data && data.length > 0) {
            const uniqueTeams = new Set(data.map(item => item.teamId));
            setTeamsAvailable(Array.from(uniqueTeams));
        } else {
            setTeamsAvailable([]);
        }
    }, [data]);

    return (
        <div className='report-main-content-container'>
            {/* Title Container */}
            <div className='report-title-container'>
                {/* Title Text */}
                <p className='report-title-text'>Specific Report</p>
            </div>

            {/* Report Selects Team & Member */}
            <div className="report-specific-filter-team-member-container">
                {/* Select Team */}
                <div className="report-filter-container">
                    <p className='report-filter-title-text'>Team:</p>
                    <select className='report-filter-select' value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
                        <option value="default" selected>Select a Team</option>
                        {teamsAvailable.map((team, index) => (
                            <option key={index} value={team}>
                                {team}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select Member */}
                {teamFilter != 'default' &&
                    <div className="report-filter-container">
                        <p className='report-filter-title-text'>Member:</p>
                        <select className='report-filter-select' value={memberFilter} onChange={(e) => setMemberFilter(e.target.value)}>
                            <option value="all" selected>All</option>
                            {membersAvailable.map((member, index) => (
                                <option key={index} value={member}>
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>
                }
            </div>

            {/* Select Sprint */}
            {teamFilter != 'default' &&
            <div className="report-filter-container report-specific-select-sprint-container">
                <p className='report-filter-title-text'>Sprint:</p>
                <select className='report-filter-select' value={sprintFilter} onChange={(e) => setSprintFilter(e.target.value)}>
                    <option value="all" selected>All</option>
                    {moduleData &&
                        moduleData.sort(
                            (a, b) => a.id - b.id
                        ).map((module) => (
                            <option key={module.id} value={module.id}>
                                {module.id} - {module.title}
                            </option>
                        ))
                    }
                </select>
            </div>
            }

            {/* Report KPI's */}
            <ReportKPI data={data} moduleData={moduleData} teamFilter={teamFilter} memberFilter={memberFilter} sprintFilter={sprintFilter} />
        </div>
    );
}
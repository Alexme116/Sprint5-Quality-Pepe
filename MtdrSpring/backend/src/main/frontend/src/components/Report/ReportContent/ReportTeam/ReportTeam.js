import { useState, useEffect } from 'react';
import ReportTeamKPI from '../ReportTeamKPI/ReportTeamKPI';

export default function ReportTeam({ data, moduleData, tasksData }) {
    const [teamFilter, setTeamFilter] = useState('default');
    const [memberFilter, setMemberFilter] = useState('all');
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
                <p className='report-title-text'>Team Report</p>
            </div>

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

            {/* Report KPI's */}
            <ReportTeamKPI data={data} moduleData={moduleData} tasksData={tasksData} teamFilter={teamFilter} membersAvailable={membersAvailable} />
        </div>
    );
}
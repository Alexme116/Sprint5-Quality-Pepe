import './HoursInvestedKPI.css';
import { useState, useEffect } from 'react';

export default function HoursInvestedKPI({ data, moduleData, teamFilter }) {
    const [hoursPerSprint, setHoursPerSprint] = useState([]);
    const [maxHours, setMaxHours] = useState(0);

    const calculateBarHeight = (hours) => {
        if (maxHours == 0) return 0;
        return (hours / maxHours) * 100;
    };

    const getSprintNameByModuleId = (moduleId) => {
        const module = moduleData.find(mod => mod.id == moduleId);
        return module ? module.title : null;
    }
    
    useEffect(() => {
        if (teamFilter === "default") {
            setHoursPerSprint([]);
            setMaxHours(0);
            return;
        }
        
        if (!moduleData || !moduleData.length) {
            setHoursPerSprint([]);
            setMaxHours(0);
            return;
        }
        
        const hoursPerModule = {};
        
        moduleData.forEach(module => {
            hoursPerModule[module.id] = 0;
        });
        
        if (teamFilter && teamFilter != "default") {
            data.filter(user => user.teamId == teamFilter)
                .forEach(user => {
                    user.tasksCompleted.forEach(task => {
                        if (hoursPerModule.hasOwnProperty(task.moduleId)) {
                            hoursPerModule[task.moduleId] += task.actualTime;
                        }
                    })
                })
        }
        
        const sprintData = Object.entries(hoursPerModule)
            .map(([moduleId, hours]) => ({
                sprint: getSprintNameByModuleId(moduleId),
                hours,
                moduleId: parseInt(moduleId)
            }))
            .sort((a, b) => a.moduleId - b.moduleId)
            .map(({ sprint, hours }) => ({ sprint, hours }));
        
        setHoursPerSprint(sprintData);
        
        const maxValue = Math.max(...sprintData.map(item => item.hours));
        setMaxHours(maxValue > 0 ? maxValue + 2 : 16);
    }, [data, moduleData, teamFilter]);
    
    return (
        <div className="hours-invested-kpi">
            {/* Legend */}
            <div className="hours-invested-legend">
                <div className="hours-invested-legend-item">
                    <div className="hours-invested-legend-color"></div>
                    <div>Hours Invested</div>
                </div>
            </div>

            <div className="hours-invested-chart-container">
                {/* Y-axis labels */}
                <div className="hours-invested-y-axis">
                    <div className="hours-invested-y-axis-title">Hours</div>
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="hours-invested-y-label">
                            {Math.round(maxHours * (7 - i) / 7)}
                        </div>
                    ))}
                </div>
                
                {/* Chart grid and bars */}
                <div className="hours-invested-chart-grid">
                    {/* Grid lines */}
                    <div className="hours-invested-grid-lines">
                        {Array.from({ length: 8 }, (_, i) => (
                            <div key={i} className="hours-invested-grid-line"></div>
                        ))}
                    </div>
                    
                    {/* Bars */}
                    <div className="hours-invested-bars-container">
                        {hoursPerSprint.map((item, index) => (
                            <div key={index} className="hours-invested-bar-column">
                                <div 
                                    className="hours-invested-bar"
                                    style={{ 
                                        height: `${calculateBarHeight(item.hours)}%`,
                                    }}
                                    title={`${item.hours} hours`}
                                >
                                </div>
                                <div className="hours-invested-x-label">{item.sprint}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
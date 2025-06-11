import React, { useState, useEffect, useRef } from 'react';

export default function TasksCompletedKPI({ data, moduleData, teamFilter, membersAvailable }) {
    const [maxTasksCompleted, setMaxTasksCompleted] = useState(0);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // Observe container width changes
    useEffect(() => {
        if (!containerRef.current) return;
        
        // Set initial width
        setContainerWidth(containerRef.current.offsetWidth);
        
        // Setup ResizeObserver to track container width changes
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });
        
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const getSprintNames = (modules) => {
        const sprints = new Set();
    
        modules.forEach(module => {
            if (module.id) {
                sprints.add(module.title);
            }
        });
    
        return Array.from(sprints).sort((a, b) => a - b);
    };

    const getSprintNameByModuleId = (moduleId) => {
        const module = moduleData.find(mod => mod.id == moduleId);
        return module ? module.title : null;
    }

    const processData = () => {
        const sprintNames = getSprintNames(moduleData);
        const tasksCompleted = {};
        sprintNames.forEach(sprint => {
            tasksCompleted[sprint] = {};
            membersAvailable.forEach(member => {
                tasksCompleted[sprint][member] = 0;
            });
        });

        if (teamFilter != 'default') {
            data.filter((user) => {
                return user.teamId == teamFilter
            })
            .forEach((user) => {
                user.tasksCompleted.forEach((task) => {
                    const sprint = getSprintNameByModuleId(task.moduleId);
                    const member = user.user.username;
                    if (tasksCompleted[sprint] && tasksCompleted[sprint][member] !== undefined) {
                        const tasksCompletedSum = tasksCompleted[sprint][member] + 1;
                        tasksCompleted[sprint][member] = tasksCompletedSum;
                        if (tasksCompletedSum > maxTasksCompleted) {
                            setMaxTasksCompleted(tasksCompletedSum);
                        }
                    }
                })
            })
        }
        
        return tasksCompleted;
    };

    const chartData = processData();
    const sprintNames = Object.keys(chartData);

    const memberColors = [
        "#4a90e2", "#50e3c2", "#4178be", "#7fdbfd", "#5F9EA0",
        "#00FFFF", "#FF7F50", "#FF69B4", "#8A2BE2", "#7FFF00",
        "#D2691E", "#FF4500", "#ADFF2F", "#FFD700", "#FF6347",
        "#4682B4", "#FF1493", "#00BFFF", "#00FF7F", "#FF8C00",
    ];
    
    // Calculate sizes based on available space
    const sprintCount = sprintNames.length;
    const memberCount = membersAvailable.length;
    const yAxisWidth = 70; // Approximate width of y-axis
    const availableWidth = Math.max(300, containerWidth - yAxisWidth);
    
    // Improved spacing calculations for better space utilization
    const minBarWidth = 20; // Increased minimum for better visibility
    const maxBarWidth = 60; // Increased maximum to better fill space with few sprints
    const barSpacing = 2;
    const minSprintSpacing = 20; // Minimum spacing between sprint groups
    
    // For few sprints, we want to maximize space usage
    let optimalBarWidth, sprintSpacing, sprintGroupWidth;
    
    if (sprintCount <= 3) {
        // With fewer sprints, distribute space more evenly
        // Calculate how much space we want to allocate per sprint as a percentage of available width
        const spacePerSprint = availableWidth / sprintCount;
        
        // Calculate space for bars within a sprint (allowing for some spacing between sprints)
        const effectiveSprintSpace = spacePerSprint * 0.85; // 85% of space per sprint for bars
        
        // Calculate bar width based on member count
        optimalBarWidth = (effectiveSprintSpace - ((memberCount - 1) * barSpacing)) / memberCount;
        
        // Ensure bar width is within bounds
        optimalBarWidth = Math.max(minBarWidth, Math.min(maxBarWidth, optimalBarWidth));
        
        // Calculate sprint group width based on the optimal bar width
        sprintGroupWidth = (memberCount * optimalBarWidth) + ((memberCount - 1) * barSpacing);
        
        // Calculate sprint spacing to distribute groups evenly
        // We adjust sprint spacing to ensure the chart fills the available width
        if (sprintCount > 1) {
            sprintSpacing = (availableWidth - (sprintCount * sprintGroupWidth)) / (sprintCount - 1);
            // Ensure minimum spacing
            sprintSpacing = Math.max(minSprintSpacing, sprintSpacing);
        } else {
            sprintSpacing = 0;
        }
    } else {
        // With many sprints, use standard calculation
        sprintSpacing = minSprintSpacing;
        const totalBarsPerGroup = memberCount;
        const totalSpacing = (totalBarsPerGroup - 1) * barSpacing * sprintCount + (sprintCount - 1) * sprintSpacing;
        const totalBars = sprintCount * totalBarsPerGroup;
        optimalBarWidth = Math.max(minBarWidth, Math.min(maxBarWidth, (availableWidth - totalSpacing) / totalBars));
        
        // Calculate one sprint group width (all bars for a single sprint)
        sprintGroupWidth = (memberCount * optimalBarWidth) + ((memberCount - 1) * barSpacing);
    }
    
    // Calculate the total content width needed
    const contentWidth = (sprintCount * sprintGroupWidth) + ((sprintCount - 1) * sprintSpacing);
    
    // Flag to determine if we need to use flex layout to distribute groups
    const useFlexDistribution = sprintCount <= 3;

    return (
        <div className="report-team-kpi" ref={containerRef}>
            {/* Chart legend */}
            <div className="report-team-chart-legend">
                {membersAvailable.map((member, memberIndex) => (
                <div key={member} className="report-team-legend-item">
                    <div className="report-team-legend-color" style={{ backgroundColor: memberColors[memberIndex] }}></div>
                    <div className="report-team-legend-label">{member}</div>
                </div>
                ))}
            </div>
            
            {/* Bar chart */}
            <div className="report-team-chart-container">
                {/* Y-axis labels */}
                <div className="report-team-y-axis">
                    <div className="report-team-y-axis-title">Tasks</div>
                    <div className="report-team-y-axis-values">
                        {(() => {
                            const labelCount = 5;
                            const effectiveMax = maxTasksCompleted < 1 ? 1 : maxTasksCompleted;
                            const step = effectiveMax / (labelCount - 1);
                            const rawLabels = [];

                            for (let i = 0; i < labelCount; i++) {
                                const value = Math.round((effectiveMax - i * step) * 100) / 100;
                                rawLabels.push(value);
                            }

                            const uniqueLabels = Array.from(new Set(rawLabels)).sort((a, b) => b - a);

                            return uniqueLabels.map((label, i) => (
                                <div key={i} className="report-team-y-label">
                                    {label}
                                </div>
                            ));
                        })()}
                    </div>
                </div>
                
                {/* Chart bars */}
                <div className="report-team-chart-grid">
                    {/* Grid lines */}
                    <div className="report-team-grid-lines">
                        {(() => {
                            const labelCount = 5;
                            const effectiveMax = maxTasksCompleted < 1 ? 1 : maxTasksCompleted;
                            const step = effectiveMax / (labelCount - 1);
                            const rawLines = [];

                            for (let i = 0; i < labelCount; i++) {
                                const value = Math.round((effectiveMax - i * step) * 100) / 100;
                                rawLines.push(value);
                            }

                            const uniqueLines = Array.from(new Set(rawLines));

                            return uniqueLines.map((_, i) => (
                                <div key={i} className="report-team-grid-line"></div>
                            ));
                        })()}
                    </div>

                    {/* Bars */}
                    <div 
                        className="report-team-bars-container"
                        style={{ 
                            width: useFlexDistribution ? '100%' : `${contentWidth}px`,
                            maxWidth: `${availableWidth}px`,
                            justifyContent: useFlexDistribution ? 'space-around' : 'flex-start'
                        }}
                    >
                        {sprintNames.map((sprint, sprintIndex) => (
                        <div 
                            key={sprint} 
                            className="report-team-sprint-group"
                            style={{ 
                                marginRight: sprintIndex < sprintNames.length - 1 ? `${sprintSpacing}px` : '0',
                                width: `${sprintGroupWidth}px`
                            }}
                        >
                            {membersAvailable.map((member, memberIndex) => (
                            <div 
                                key={`${sprint}-${member}`} 
                                className="report-team-bar-container"
                                style={{ 
                                    width: `${optimalBarWidth}px`,
                                    marginRight: memberIndex < membersAvailable.length - 1 ? `${barSpacing}px` : '0'
                                }}
                            >
                                <div 
                                    className="report-team-bar"
                                    style={{ 
                                        height: `${(chartData[sprint][member] / (maxTasksCompleted || 1)) * 100}%`,
                                        backgroundColor: memberColors[memberIndex]
                                    }}
                                    title={`${chartData[sprint][member]} tasks`}
                                >
                                </div>
                            </div>
                            ))}
                            <div className="report-team-sprint-label">{sprint}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
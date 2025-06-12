import './ReportTeamKPI.css';
import { useState } from 'react';
import { Arrow_Down_Icon, Arrow_Up_Icon } from '../../../../Icons';
import HoursInvestedKPI from './HoursInvestedKPI/HoursInvestedKPI';
import WorkedHoursKPI from './WorkedHoursKPI/WorkedHoursKPI';
import TasksCompletedKPI from './TasksCompletedKPI/TasksCompletedKPI';

export default function ReportTeamKPI({ data, moduleData, tasksData, teamFilter, membersAvailable }) {
    const [hideTasksKPI, setHideTasksKPI] = useState(false);
    const [hideHoursKPI, setHideHoursKPI] = useState(false);
    const [hideTasksCompletedKPI, setHideTasksCompletedKPI] = useState(false);

    return (
            <div className='kpi-main-content-container'>
                {/* Title Sections Container */}
                <div className='kpi-title-sections-container'>
                    <p className='kpi-title-sections-text'>Key Performance Indicators</p>
                </div>
    
                {/* KPI's Sections */}
                <div className='kpi-sections-container'>
                    {/* Hours Invested Per Sprint KPI */}
                    <div className='kpi-main-container kpi-first-container'>
                        <div className='kpi-container'>
                            <div className='kpi-title-container'>
                                <p className='kpi-title-container-text'>Hours Invested per Sprint</p>
                                <button
                                    className='kpi-title-button'
                                    onClick={() => {setHideTasksKPI(!hideTasksKPI)}}
                                >
                                    {!hideTasksKPI ?
                                        <Arrow_Down_Icon w='25px' h='25px' />
                                        :
                                        <Arrow_Up_Icon w='25px' h='25px' />
                                    }
                                </button>
                            </div>
    
                            {/* Hours Invested Per Sprint Data */}
                            {(!hideTasksKPI && teamFilter != "default") &&
                                <HoursInvestedKPI data={data} moduleData={moduleData} teamFilter={teamFilter} membersAvailable={membersAvailable} />
                            }
                        </div>
                    </div>
    
                    {/* Worked Hours KPI */}
                    <div className='kpi-main-container'>
                        <div className='kpi-title-container'>
                            <p className='kpi-title-container-text'>Worked Hours per Sprint</p>
                            <button
                                className='kpi-title-button'
                                onClick={() => {setHideHoursKPI(!hideHoursKPI)}}
                            >
                                {!hideHoursKPI ?
                                    <Arrow_Down_Icon w='25px' h='25px' />
                                    :
                                    <Arrow_Up_Icon w='25px' h='25px' />
                                }
                            </button>
                        </div>
    
                        {/* KPI Tasks Data */}
                        {(!hideHoursKPI && teamFilter != "default") &&
                            <WorkedHoursKPI data={data} moduleData={moduleData} teamFilter={teamFilter} membersAvailable={membersAvailable} />
                        }
                    </div>
    
                    {/* Completed Tasks KPI */}
                    <div className='kpi-main-container'>
                        <div className='kpi-title-container'>
                            <p className='kpi-title-container-text'>Tasks Completed per Sprint</p>
                            <button
                                className='kpi-title-button'
                                onClick={() => {setHideTasksCompletedKPI(!hideTasksCompletedKPI)}}
                            >
                                {!hideTasksCompletedKPI ?
                                    <Arrow_Down_Icon w='25px' h='25px' />
                                    :
                                    <Arrow_Up_Icon w='25px' h='25px' />
                                }
                            </button>
                        </div>
    
                        {/* KPI Completed Tasks Data */}
                        {(!hideTasksCompletedKPI && teamFilter != "default") &&
                            <TasksCompletedKPI data={data} moduleData={moduleData} teamFilter={teamFilter} membersAvailable={membersAvailable} />
                        }
                    </div>
                </div>
            </div>
        )
}
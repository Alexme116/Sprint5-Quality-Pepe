import './ReportContent.css';
import { useState } from 'react';
import ReportSpecific from './ReportSpecific/ReportSpecific';
import ReportTeam from './ReportTeam/ReportTeam';

export default function ReportContent({ data, moduleData, tasksData }) {
    const [viewSelected, setViewSelected] = useState('ReportSpecific');
    return (
        <>
            {/* Report Nav */}
            <div className='report-content-main-container'>
                <div className='report-content-nav-main-container'>
                    {/* Title Nav */}
                    <h1 className='report-content-nav-main-container-text'>Report Type</h1>

                    {/* Nav Buttons */}
                    <div className='report-content-nav-container'>
                        <button onClick={() => setViewSelected('ReportSpecific')}>
                            <p className={`report-content-nav-text ${viewSelected == 'ReportSpecific' ? 'report-content-selected' : ''}`}>Specific</p>
                        </button>
                        <button onClick={() => setViewSelected('ReportTeam')}>
                            <p className={`report-content-nav-text ${viewSelected == 'ReportTeam' ? 'report-content-selected' : ''}`}>Team</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Report Content */}
            {viewSelected == 'ReportSpecific' &&
                <ReportSpecific data={data} moduleData={moduleData} />
            }
            {viewSelected == 'ReportTeam' &&
                <ReportTeam data={data} moduleData={moduleData} tasksData={tasksData} />
            }
        </>
    );
}
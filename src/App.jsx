import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Module1Profile from './modules/Module1Profile';
import Module2Attendance from './modules/Module2Attendance';
import Module3MonthlyReport from './modules/Module3MonthlyReport';
import Module4Supervision from './modules/Module4Supervision';
import Module5Evaluation from './modules/Module5Evaluation';
import Module6Certificate from './modules/Module6Certificate';
import Module7Logbook from './modules/Module7Logbook';
import Module8Reports from './modules/Module8Reports';
import ModuleAdminOverview from './modules/ModuleAdminOverview';

import {
  INITIAL_STUDENT,
  INITIAL_COMPANY,
  INITIAL_ATTENDANCE,
  INITIAL_MONTHLY_REPORT,
  INITIAL_SUPERVISION,
  INITIAL_SUPERVISOR_EVALUATION,
  INITIAL_LOGBOOK,
  INITIAL_REPORTS_MODULE,
  INITIAL_CERTIFICATE
} from './data/initialData';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('sskru_theme') || 'light');

  // Role state: 'student', 'supervisor', 'advisor', 'admin'
  const [currentRole, setCurrentRole] = useState(() => localStorage.getItem('sskru_role') || 'student');

  // Active module
  const [activeModule, setActiveModule] = useState('module1');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Voided / Fraud status (FR-2.4)
  const [isVoided, setIsVoided] = useState(() => {
    const saved = localStorage.getItem('sskru_is_voided');
    return saved ? JSON.parse(saved) : false;
  });
  const [voidReason, setVoidReason] = useState(() => {
    return localStorage.getItem('sskru_void_reason') || '';
  });

  // Data states with LocalStorage persistence
  const [studentData, setStudentData] = useState(() => {
    const saved = localStorage.getItem('sskru_student');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT;
  });

  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('sskru_company');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY;
  });

  const [attendanceList, setAttendanceList] = useState(() => {
    const saved = localStorage.getItem('sskru_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [monthlyReports, setMonthlyReports] = useState(() => {
    const saved = localStorage.getItem('sskru_monthly_reports');
    return saved ? JSON.parse(saved) : INITIAL_MONTHLY_REPORT;
  });

  const [supervisionData, setSupervisionData] = useState(() => {
    const saved = localStorage.getItem('sskru_supervision');
    return saved ? JSON.parse(saved) : INITIAL_SUPERVISION;
  });

  const [evaluationData, setEvaluationData] = useState(() => {
    const saved = localStorage.getItem('sskru_evaluation');
    return saved ? JSON.parse(saved) : INITIAL_SUPERVISOR_EVALUATION;
  });

  const [logbookList, setLogbookList] = useState(() => {
    const saved = localStorage.getItem('sskru_logbook');
    return saved ? JSON.parse(saved) : INITIAL_LOGBOOK;
  });

  const [reportsData, setReportsData] = useState(() => {
    const saved = localStorage.getItem('sskru_reports_module');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS_MODULE;
  });

  const [certificateData, setCertificateData] = useState(() => {
    const saved = localStorage.getItem('sskru_certificate');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATE;
  });

  // Apply Theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sskru_theme', theme);
  }, [theme]);

  // Persist role
  useEffect(() => {
    localStorage.setItem('sskru_role', currentRole);
  }, [currentRole]);

  // Save on state change
  useEffect(() => {
    localStorage.setItem('sskru_student', JSON.stringify(studentData));
  }, [studentData]);

  useEffect(() => {
    localStorage.setItem('sskru_company', JSON.stringify(companyData));
  }, [companyData]);

  useEffect(() => {
    localStorage.setItem('sskru_attendance', JSON.stringify(attendanceList));
  }, [attendanceList]);

  useEffect(() => {
    localStorage.setItem('sskru_monthly_reports', JSON.stringify(monthlyReports));
  }, [monthlyReports]);

  useEffect(() => {
    localStorage.setItem('sskru_supervision', JSON.stringify(supervisionData));
  }, [supervisionData]);

  useEffect(() => {
    localStorage.setItem('sskru_evaluation', JSON.stringify(evaluationData));
  }, [evaluationData]);

  useEffect(() => {
    localStorage.setItem('sskru_logbook', JSON.stringify(logbookList));
  }, [logbookList]);

  useEffect(() => {
    localStorage.setItem('sskru_reports_module', JSON.stringify(reportsData));
  }, [reportsData]);

  useEffect(() => {
    localStorage.setItem('sskru_is_voided', JSON.stringify(isVoided));
    localStorage.setItem('sskru_void_reason', voidReason);
  }, [isVoided, voidReason]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // FR-2.4 Fraud trigger
  const handleToggleVoid = (reason) => {
    if (!isVoided) {
      setIsVoided(true);
      setVoidReason(reason || 'พบหลักฐานการปลอมแปลงการลงเวลาทำงาน');
      setStudentData((prev) => ({ ...prev, isVoided: true, finalGrade: 'E', status: 'ผลการฝึกงานเป็นโมฆะ (เกรด E)' }));
    } else {
      setIsVoided(false);
      setVoidReason('');
      setStudentData((prev) => ({ ...prev, isVoided: false, finalGrade: 'A', status: 'กำลังฝึกปฏิบัติงาน' }));
    }
  };

  const handleAddAttendance = (newRecord) => {
    setAttendanceList((prev) => [newRecord, ...prev]);
  };

  const handleUpdateReport = (updatedReport) => {
    setMonthlyReports((prev) => prev.map((r) => (r.id === updatedReport.id ? updatedReport : r)));
  };

  const handleAddLogbook = (newEntry) => {
    setLogbookList((prev) => [newEntry, ...prev]);
  };

  const handleApproveLogbook = (id, comment) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setLogbookList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'approved',
              supervisorComment: comment,
              approvedAt: `${item.date} ${timeStr}`
            }
          : item
      )
    );
  };

  const moduleTitles = {
    module1: 'ข้อมูลนักศึกษาและหน่วยงาน (ส่วนที่ 1)',
    module2: 'ระบบลงเวลาปฏิบัติงาน (ส่วนที่ 2)',
    module7: 'สมุดบันทึกรายวัน Logbook & สถิติ (ส่วนที่ 7)',
    module3: 'แบบรายงานประจำเดือน (ส่วนที่ 3)',
    module4: 'บันทึกการนิเทศการฝึกงาน (ส่วนที่ 4)',
    module5: 'แบบประเมินผล 24 ข้อ (ส่วนที่ 5)',
    module8: 'เค้าโครงและเล่มรายงาน (ส่วนที่ 8)',
    module6: 'ประกาศนียบัตรรับรองการฝึกงาน (ส่วนที่ 6)',
    admin_overview: 'ศูนย์บริหารจัดการภาพรวม (Admin)'
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        isOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        currentRole={currentRole}
        isVoided={isVoided}
      />

      {/* Main Container */}
      <div className="app-main">
        {/* Top Navbar */}
        <Navbar
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          studentData={studentData}
          activeModuleTitle={moduleTitles[activeModule]}
          pendingApprovalsCount={logbookList.filter((l) => l.status === 'pending').length}
        />

        {/* Content Render based on activeModule */}
        <main style={{ flex: 1 }}>
          {activeModule === 'module1' && (
            <Module1Profile
              studentData={studentData}
              companyData={companyData}
              onUpdateStudent={setStudentData}
              onUpdateCompany={setCompanyData}
              currentRole={currentRole}
            />
          )}

          {activeModule === 'module2' && (
            <Module2Attendance
              attendanceList={attendanceList}
              onAddAttendance={handleAddAttendance}
              isVoided={isVoided}
              voidReason={voidReason}
              onToggleVoid={handleToggleVoid}
              currentRole={currentRole}
              studentData={studentData}
            />
          )}

          {activeModule === 'module7' && (
            <Module7Logbook
              logbookList={logbookList}
              onAddLogbook={handleAddLogbook}
              onApproveLogbook={handleApproveLogbook}
              currentRole={currentRole}
            />
          )}

          {activeModule === 'module3' && (
            <Module3MonthlyReport
              monthlyReports={monthlyReports}
              onUpdateReport={handleUpdateReport}
              currentRole={currentRole}
            />
          )}

          {activeModule === 'module4' && (
            <Module4Supervision
              supervisionData={supervisionData}
              onUpdateSupervision={setSupervisionData}
              currentRole={currentRole}
              studentData={studentData}
              companyData={companyData}
            />
          )}

          {activeModule === 'module5' && (
            <Module5Evaluation
              evaluationData={evaluationData}
              onUpdateEvaluation={setEvaluationData}
              currentRole={currentRole}
              studentData={studentData}
            />
          )}

          {activeModule === 'module8' && (
            <Module8Reports
              reportsData={reportsData}
              onUpdateReports={setReportsData}
              currentRole={currentRole}
              studentData={studentData}
            />
          )}

          {activeModule === 'module6' && (
            <Module6Certificate
              certificateData={certificateData}
              studentData={studentData}
              companyData={companyData}
              isVoided={isVoided}
              currentRole={currentRole}
            />
          )}

          {activeModule === 'admin_overview' && (
            <ModuleAdminOverview
              studentData={studentData}
              companyData={companyData}
              attendanceList={attendanceList}
              isVoided={isVoided}
              voidReason={voidReason}
              onToggleVoid={handleToggleVoid}
              onSelectModule={setActiveModule}
            />
          )}
        </main>
      </div>
    </div>
  );
}

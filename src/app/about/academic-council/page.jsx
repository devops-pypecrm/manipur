'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '@/lib/api';
import '@/styles/AcademicCouncil.css';

const DEFAULT_DATA = {
  title: 'IInd Academic Council',
  subtitle: 'Manipur International University — Term: 21st Dec 2024 to 31st Dec 2027',
  intro: 'The IInd Academic Council of Manipur International University for the duration 21 Dec 2024 to 31st Dec 2027 consists of 60 members, as per Amended Guidelines approved by the Executive Council meeting on 16th October 2024.',
  composition: [
    'MIU Faculties – 25 nos.',
    'Government nominees – 03 nos.',
    'Academicians and Experts from National/Central Universities – 4 nos.',
    'Academicians and Experts local – 09 nos.',
    'Industry Experts – 12 nos.',
    'Social Category Representatives – 03 nos.',
    'Student representatives – 03 nos.',
    'Member Secretary – 01 nos.',
  ],
  notificationUrl: '',
  sections: [
    {
      title: 'Members from MIU Faculty',
      members: [
        { sl: '1', name: 'Prof P Kumar Singh', designation: 'Pro-Vice Chancellor — Vice Chairperson' },
        { sl: '2', name: 'Prof Irom Tomba Singh', designation: 'Dean School of Mathematical Sciences — Member' },
        { sl: '3', name: 'Prof S James', designation: 'Dean School of Law, Defence and Strategic Studies — Member' },
        { sl: '4', name: 'Prof Charles Yuhlung', designation: 'Dean School of Social Sciences — Member' },
        { sl: '5', name: 'Prof S Raghumani Singh', designation: 'Dean School of Agri and Allied Sciences — Member' },
        { sl: '6', name: 'Prof Ng Ajitkumar', designation: 'Dean School of Biological Sciences — Member' },
        { sl: '7', name: 'Prof Th Basanta Singh', designation: 'Dean School of Physical Sciences and Engineering — Member' },
        { sl: '8', name: 'Prof N Ibohal Singh', designation: 'Dean School of Human and Health Sciences — Member' },
        { sl: '9', name: 'Prof Md Kheiruddin Shah', designation: 'Dean School of Commerce and Management Sciences — Member' },
        { sl: '10', name: 'Dr Rajesh Chinchewadi', designation: 'Dean School of Innovation and Skill — Member' },
        { sl: '11', name: 'Prof R K Indira Devi', designation: 'Dean School of Humanities — Member' },
        { sl: '12', name: 'Prof W Sushma Devi', designation: 'Dean Students Welfare — Member' },
        { sl: '13', name: 'Prof H Prativa', designation: 'Professor — Member' },
        { sl: '14', name: 'Prof R K Sujata', designation: 'Professor — Member' },
        { sl: '15', name: 'Prof Mayengbam Bidyarani Devi', designation: 'Professor — Member' },
        { sl: '16', name: 'Prof Irom Shirly', designation: 'Professor — Member' },
        { sl: '17', name: 'Prof Chandibai Potsangbam', designation: 'Professor — Member' },
        { sl: '18', name: 'Dr M Bidyarani Devi', designation: 'Associate Professor — Member' },
        { sl: '19', name: 'Dr Grihalaxmi Devi', designation: 'Associate Professor — Member' },
        { sl: '20', name: 'Dr Kh Mukta Singh', designation: 'Associate Professor — Member' },
        { sl: '21', name: 'Dr A Bijayalaxmi', designation: 'Associate Professor — Member' },
        { sl: '22', name: 'Dr L Nonie', designation: 'Associate Professor — Member' },
        { sl: '23', name: 'Dr Salam Anand', designation: 'Associate Professor — Member' },
        { sl: '24', name: 'Dr Yumlembam Bidyananda', designation: 'Associate Professor — Member' },
        { sl: '25', name: 'Dr Senjam Jinus Singh', designation: 'Associate Professor — Member' },
      ],
    },
    {
      title: 'State Government Nominee Members',
      members: [
        { sl: '27', name: 'The Director of University & Higher Education nominee', designation: 'Nominee Member' },
        { sl: '28', name: 'The Director of Technical Education nominee', designation: 'Nominee Member' },
        { sl: '29', name: 'Dr Rajkumari Sanakhonbi, Deputy Director, Directorate of AYUSH, Govt of Manipur', designation: 'Nominee Member' },
      ],
    },
    {
      title: 'Eminent Experts & Academicians from National Universities',
      members: [
        { sl: '30', name: 'Dr Ngangkham Joykumar Singh', designation: 'HOD, College of Food Technology, CAU Imphal — Advisory Member' },
        { sl: '31', name: 'Dr Thiyam David Singh', designation: 'HOD, Department of Chemistry, NIT Imphal — Advisory Member' },
        { sl: '32', name: 'Retd Professor Y Hemanta Kumar', designation: 'Dept of Rabindra Sangit Dance and Drama, Visva Bharti University — Advisory Member' },
        { sl: '33', name: 'Dr Soihiamlung Dangmei', designation: 'Asst Professor Political Science, IG National Tribal University Manipur — Advisory Member' },
      ],
    },
    {
      title: "VC's Nominees — Eminent Experts / Academicians (Local)",
      members: [
        { sl: '34', name: 'Prof (Retd) H Tombi Singh', designation: 'Retd VC Manipur University & Retd Director IBSD — Advisory Member' },
        { sl: '35', name: 'Dr Th Asha Sinha', designation: 'Principal Hindi Teacher Training College, Govt of Manipur — Advisory Member' },
        { sl: '36', name: 'Dr Th Munindro Singh', designation: 'Retd Director Planning Dept, Govt of Manipur — Advisory Member' },
        { sl: '37', name: 'Dr Potsangbam Latsaheb', designation: 'MD Orthopedics, Retd SAG Equiv to IG BSF — Advisory Member' },
        { sl: '38', name: 'Dr A Momon Singh', designation: 'MD Forensic Medicine, Retd HOD RIMS — Advisory Member' },
        { sl: '39', name: 'Dr Ch Manglem Singh', designation: 'MD Obs and Gynaecology, Retd Professor JNIMS — Advisory Member' },
        { sl: '40', name: 'Dr Th Biren', designation: 'Retd Principal Oriental Autonomous College — Advisory Member' },
        { sl: '41', name: 'Dr S Gunadhor Singh', designation: 'Retd Reader Imphal College — Advisory Member' },
        { sl: '42', name: 'Dr M Makhonmani', designation: 'Retd Asst Professor, Culture and Performing Arts, Manipur University — Advisory Member' },
      ],
    },
    {
      title: 'Eminent Experts of the Industry',
      members: [
        { sl: '43', name: 'Dr Rajeev Kangabam', designation: 'Manipur Technology Innovation Hub, Imphal — Advisory Member' },
        { sl: '44', name: 'Dr Naorem Chaoba Singh', designation: 'President, Manipur Yogasana Sports Association — Advisory Member' },
        { sl: '45', name: 'Ksh Gopendra Singh', designation: 'Rajya Prabhari, Patanjali Yoga Society — Advisory Member' },
        { sl: '46', name: 'S Sanathoi Singh', designation: 'CEO SS Electronics, Imphal East — Advisory Member' },
        { sl: '47', name: 'Dr Premjit Meitei', designation: 'MAYON Company Pvt Ltd, Imphal West — Advisory Member' },
        { sl: '48', name: 'Dr Mohammed Rakibuddin', designation: 'CEO JR Hospital, Imphal East — Advisory Member' },
        { sl: '49', name: 'Ch Miranda Devi', designation: 'Principal Kangla Health Care Institutional Foundation — Advisory Member' },
        { sl: '50', name: 'Sayed Ajmath', designation: 'Coordinator JR Institute of Health Sciences, Imphal East — Advisory Member' },
        { sl: '51', name: 'Mr Telem Dara Singh', designation: 'President Nongpok Pukkei Organic Producers Company Pvt Ltd — Advisory Member' },
        { sl: '52', name: 'Gitashwari Yumnam', designation: 'Proprietor Green Biotech, Imphal West — Advisory Member' },
        { sl: '53', name: 'Elizabeth Yambem', designation: 'Proprietor Dwellers Tea, Imphal West — Advisory Member' },
        { sl: '54', name: 'Aran', designation: 'Proprietor Hortrition Foods, Wino Bazar Ukhrul — Advisory Member' },
      ],
    },
    {
      title: 'Social Category Representative Members',
      members: [
        { sl: '55', name: 'Mr Dearson Panmei', designation: 'Schedule Tribe nominee — Advisory Member' },
        { sl: '56', name: 'Mr Yumkhaibam James Meitei', designation: 'Schedule Caste nominee — Advisory Member' },
        { sl: '57', name: 'Dr Sapam Jasowanta', designation: "PWDs nominee (Visual imp) — Advisory Member" },
      ],
    },
    {
      title: 'Students Representatives',
      members: [
        { sl: '58', name: 'Ms H Tapashree', designation: 'PhD courses representative — Student Representative' },
        { sl: '59', name: 'Mr L Viswanath Singh', designation: 'PG courses representative — Student Representative' },
        { sl: '60', name: 'Ms Rabiya Begum', designation: 'UG Courses representative — Student Representative' },
      ],
    },
    {
      title: 'Member Secretary',
      members: [
        { sl: '61', name: 'Prof T Brajeshwari Devi', designation: 'Registrar MIU — Member Secretary' },
      ],
    },
    {
      title: 'Invitees',
      members: [
        { sl: '62', name: 'Prof T Kamalabati Devi', designation: 'Controller of Examinations — Permanent Invitee' },
        { sl: '63', name: 'Ningombam Amarjit Singh', designation: 'Director MIU — Permanent Invitee' },
        { sl: '64', name: 'Thokchom Lenin Singh', designation: 'Librarian MIU — Permanent Invitee' },
        { sl: '65', name: 'Kiran Soraisam', designation: 'Finance Officer — Permanent Invitee' },
        { sl: '66', name: 'Prof (Retd) T Umabati Devi', designation: 'Ombudsperson, Students Grievances Redressal Committee — Permanent Invitee' },
      ],
    },
  ],
};

export default function AcademicCouncilPage() {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    API.get('/settings/academic-council')
      .then(({ data: res }) => { if (res?.content) setData(prev => ({ ...prev, ...res.content })); })
      .catch(() => {});
  }, []);

  return (
    <div className="ac-page">
      {/* Hero */}
      <div className="ac-hero">
        <div className="container">
          <nav className="ac-breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/about">About Us</Link><span>›</span>
            <Link href="/about/governance">Governance</Link><span>›</span>
            <span>Academic Council</span>
          </nav>
          <span className="section-badge">GOVERNANCE</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
      </div>

      <div className="container ac-body">

        {/* Intro + composition */}
        <div className="ac-intro-card">
          <p className="ac-intro-text">{data.intro}</p>
          {data.notificationUrl && (
            <a href={data.notificationUrl} target="_blank" rel="noopener noreferrer" className="ac-download-btn">
              📄 Download Notification
            </a>
          )}
          <div className="ac-composition">
            <h3>Composition</h3>
            <ul>
              {(data.composition || []).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>

        {/* Sections */}
        {(data.sections || []).map((section, si) => (
          <div key={si} className="ac-section">
            <h2 className="ac-section-title">{section.title}</h2>
            <div className="ac-table-wrapper">
              <table className="ac-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Name</th>
                    <th>Designation / Role</th>
                  </tr>
                </thead>
                <tbody>
                  {(section.members || []).map((m, mi) => (
                    <tr key={mi}>
                      <td className="ac-sl">{m.sl}</td>
                      <td><strong>{m.name}</strong></td>
                      <td className="ac-role">{m.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

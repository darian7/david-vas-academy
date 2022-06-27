import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";


import { LogoutOutlined, AppleOutlined } from "@ant-design/icons";
import { auth as authActions } from "../../../../services/Auth/AuthActions";
import { course as courseActions } from "../../../../services/Course/CourseActions";
import { Modules } from "../Components/Modules/Modules";
import { ProfileLesson } from "../Components/ProfileLesson/ProfileLesson";

import { SocialButtons } from '../../../../components/SocialButtons/SocialButtons'

import logo from "../../../../assets/login/Logo-Trader-Expert.png";
import logoDV from "../../../../assets/login/Logo-DV.png";

export const ListCourses = ({
  history
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLesson, setLesson] = useState();
  const [isCourse, setCourse] = useState();
  const { courses, loading: loadingCourse } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(courseActions.getCourses());
  }, []);

  useEffect(() => {
    if (courses?.length > 0) setCourse(courses[0]);
  }, [courses?.length]);

  useEffect(() => {
    if (isCourse?.lessons?.length > 0) setLesson(isCourse?.lessons[0]);
  }, [isCourse]);

  const goLogout = () => {
    dispatch(authActions.logout());
  };

  const pushTraidingView = () => {
    history.push("/trading-view")
  };

  return (
    <div className="list-courses">
      <div className="content-player">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="Trader-Expert" />
          </div>

          <button onClick={pushTraidingView}>
            {`trading view`} <AppleOutlined />
          </button>

          <button onClick={goLogout}>
            {t(`button.logout`)} <LogoutOutlined />
          </button>
        </div>

        {courses?.length == 0 &&
          <h3 style={{
            color: "#00aa15",
            fontSize: 18,
            marginTop: 40
          }}>
            No hay cursos
          </h3>
        }

        <ProfileLesson isLesson={isLesson} isCourse={isCourse} />
      </div>

      <div className="content-modules" style={{ height: "auto" }}  >
        <div className="logo-dv" style={{ marginBottom: 20 }}>
          <img src={logoDV} alt="David-Vas" />
        </div>
        
        <div className="mod-box" style={{ height: "auto" }}  >
          <Modules
            isLesson={isLesson}
            isCourse={isCourse}
            setCourse={setCourse}
            setLesson={setLesson}
          />
        </div>
        
        <div className="social-media">
          <SocialButtons />
        </div>

      </div>
    </div >
  );
};

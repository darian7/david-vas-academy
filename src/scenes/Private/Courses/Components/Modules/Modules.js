import { useSelector } from "react-redux";
import { Collapse } from "antd";

const { Panel } = Collapse;

export const Modules = ({
  setCourse,
  setLesson
}) => {
  const { courses, loading: loadingCourse } = useSelector(
    (state) => state.course
  )

  const changeCourse = (key) => {
    if (!key)
      return

    const findCourse = courses?.find((course) => course?.id == key);
    setCourse(findCourse);

  }

  return (
    <div className="modules">
      <Collapse accordion expandIconPosition="right" onChange={changeCourse}>
        {courses?.map((course, i) => (
          <Panel key={course?.id} header={course?.title?.es} key={course?.id}>
            {course?.lessons?.map((lesson) => (
              <div style={{ cursor: "pointer" }} key={lesson?.id} onClick={() => setLesson(lesson)}>
                - {lesson?.title?.es}
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

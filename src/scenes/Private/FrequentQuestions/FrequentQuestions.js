import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../assets/icons/next.svg'
import { question as questionActions } from '../../../services/Question/QuestionActions';
import i18n from '../../../i18n/i18n';

export const FrequentQuestions = ({ }) => {

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [themeSelected, setThemeSelected] = useState(-1);
  const [itemSelected, setItemSelected] = useState(-1);
  const [questionSelected, setQuestionSelected] = useState(-1);
  const [openTheme, toggleTheme] = useState(false);

  const { loading, themes } = useSelector(state => state.question)

  useEffect(() => {
    dispatch(questionActions.getQuestions())
  }, [])

  const toggleThemeQuest = (id, type) => {
    if (type === "theme") {
      setThemeSelected(id === themeSelected ? -1 : id)
      setItemSelected(id === itemSelected ? -1 : id)
      setQuestionSelected(-1)
      toggleTheme(id !== itemSelected)
    }
    if (type === "question") {
      setQuestionSelected(id === questionSelected ? -1 : id)
    }
  }

  return (
    <div className="frequent-questions">
      <div className="frequent-questions-container">
        <h2>{t('header.item.questions_frequent')}</h2>
        {themes?.map((theme, i) =>
          (itemSelected === i || itemSelected === -1) &&
          <div className="frequent-questions-theme" key={i}>
            <div className={`frequent-questions-theme-text ${openTheme ? 'frequent-questions-theme-text--open' : ''}`} onClick={() => toggleThemeQuest(i, 'theme')}>
              <span>
                {openTheme && <NextIcon />}
                {openTheme && t('scenes.frequent_questions.theme') + ': '}{theme?.title[i18n.language]}</span>
            </div>
            {themeSelected === i &&
              <div className="frequent-questions-sub-item">{
                theme?.questions?.map((question, j) =>
                  <div key={j} className="frequent-questions-question">
                    <div className="frequent-questions-question-text" onClick={() => toggleThemeQuest(j, 'question')}>{question?.description[i18n.language]}</div>
                    {questionSelected === j &&
                      <div className="frequent-questions-answer">{question?.answers[0]?.description[i18n.language]}</div>
                    }
                  </div>
                )}
              </div>
            }
          </div>
        )}

      </div>
    </div>
  )
}
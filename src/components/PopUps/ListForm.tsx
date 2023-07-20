import { useEffect, useRef, useState } from 'react';

import { object, string, ObjectSchema } from 'yup';
import { Formik, FormikProps } from 'formik';

import { Input, PopUp, useToast } from '@j-meira/mui-theme';

import { useAppDispatch } from '../../redux';
import { AddList, EditList } from '../../redux/actions';
import { IList } from '../../types';

import { IPopUp } from '.';
import { initialList } from '../../redux/reducers';
import { generateID } from '../../utils';

interface IListForm {
  name: string;
}

type IListFormPopUpProps = {
  list?: IList;
  successAction?: (_id: string) => void;
} & IPopUp;

const schema: ObjectSchema<IListForm> = object({
  name: string().min(3).max(15).required(),
});

export const ListFormPopUp = ({
  list,
  open,
  successAction,
  toggle,
}: IListFormPopUpProps) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<IListForm>>(null);
  const [initialValues, setInitialValues] = useState<IListForm>({
    name: '',
  });

  const onSubmit = (data: IListForm) => {
    const { name } = data;
    if (list) {
      dispatch(EditList({ _id: list._id, name }));
      toggle();
    } else {
      const _id = generateID('aA#');
      successAction?.(_id);
      dispatch(
        AddList({
          ...initialList,
          _id,
          name,
        }),
      );
    }
    useToast.success(`${name}' ${list ? 'renamed' : 'add'} with success`);
  };

  const KeySpect = (
    e: React.KeyboardEvent<
      | HTMLInputElement
      | HTMLButtonElement
      | HTMLDivElement
      | HTMLTextAreaElement
    >,
  ) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      formRef.current?.handleSubmit();
    }
  };

  useEffect(() => {
    if (open) {
      setInitialValues({ name: list ? list.name : '' });
    } else {
      formRef.current?.handleReset();
    }
    // eslint-disable-next-line
  }, [open]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => onSubmit(values)}
      enableReinitialize
      innerRef={formRef}
    >
      {({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <PopUp
            className='pop-up-list-form'
            name='list-form'
            open={open}
            toggle={toggle}
            grided
            maxWidth='sm'
            action={handleSubmit}
            cancel
            disableRestoreFocus
            cancelLabel='Cancell'
            successLabel={list ? 'Rename' : 'Create'}
          >
            <Input
              label='List name'
              name='name'
              autoFocus
              onKeyDown={KeySpect}
              grid={{ md: 12, lg: 12 }}
            />
          </PopUp>
        </form>
      )}
    </Formik>
  );
};

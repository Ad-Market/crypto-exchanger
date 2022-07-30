import { useTranslation } from 'react-i18next';
import Exchanger from '../components/main/Exchanger';
import '../i18n';

const Main = () => {
    const { t } = useTranslation();

    return (
        <div className='main__content'>
            {t('text.part1')}
            <Exchanger/>
        </div>
    )
}

export default Main;
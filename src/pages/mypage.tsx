import React, { useState } from "react";
import { Layout } from "components/layout";
import { MypageTab } from 'components/tab';
import { MyBuying } from 'components/mybuying';

export default function MyPage(){
    // Tab Control
    const [activeTab, setActiveTab] = useState<string>('mybuying');

    function onClickListener(type: string){
        setActiveTab(type);
    }

    return(
        <div>
        <Layout noFooter={true}>
                <MypageTab create={{ 
                    mybuying: { sectionRef: 'mybuying' },
                    mypick: { sectionRef: 'mypick' }
                    }}
                    active={activeTab}
                    clicktab={onClickListener}
                />
                {activeTab === 'mybuying'?  <MyBuying/> : <div>찜한내역</div>}
        </Layout>
        </div>
    )
}
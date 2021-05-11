import React, { useState } from "react";
import { Layout } from "components/layout";
import { MypageTab } from 'components/tab';
import { MypageList } from 'components/mypage-list';

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
                {activeTab === 'mybuying'?  <MypageList activeTab = 'mybuying'/> : <MypageList activeTab = 'mypick'/>}
        </Layout>
        </div>
    )
}
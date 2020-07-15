<view class="card">
    <view class="card-item" hover-class="card-item-hover" id="{{id}}" bindtap="handleClick">
        <view class="card-title">
            <view class="card-avatar">
                <image class="card-avatar" src="{{avatar}}" />
            </view>
            <view class="nickNameFlex card-title-txt" style="font-size:{{titlefontsize}}rpx;height:{{titleheight}}rpx">
                {{nickName}}
            </view>
        </view>
        <view class="card-content">
            <view class="weui-article__p context">
                {{context}}
            </view>
            <view class="card-imgs" qq:if="{{img.length>0?true:false}}">
                <view qq:for="{{img}}" qq:for-item="item" style="height: 300rpx,width: 300rpx">
                    <image class="card-img" qq:hidden="{{!item?true:false}}" src="{{item}}" mode="aspectFill" style="height: 300rpx,width:300rpx" />
                </view>
            </view>
        </view>
        <view style="margin-top:20rpx;"> <view qq:for="{{labelList}}" qq:for-item="item" qq:for-index="index" class="label">{{item}}</view></view>
        <view class="card-actions">
            <text class="comments-publishDate">{{publishDate}}</text>
            <view class="icon-path" catchtap="handleLike">
                <image class="star" src="{{value}}" animation="{{aniA}}" />
                <view class="star-content"><text>{{star}}</text></view>
            </view>
            <view class="icon-path" catchtap="handleClick">
                <image class="comments" src="https://tree-home-1259219507.cos.ap-chengdu.myqcloud.com/%E8%AF%84%E8%AE%BA%20(1).png" />
                <view class="comments-content"><text>{{comment}}</text></view>
            </view>
        </view>
    </view>
</view>

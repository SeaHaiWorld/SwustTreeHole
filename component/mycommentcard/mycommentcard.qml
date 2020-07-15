<view class="card">
    <view class="card-item" hover-class="card-item-hover" id="{{id}}" bindtap="handleClick">
        <view class="card-title">
            <view class="card-avatar">
                <image class="card-avatar" src="{{avatar}}" />
            </view>
            <view
                style="display:flex; flex-direction:column; height:120rpx;"
            >
                <view class="card-title-txt" style="font-size:26rpx;height:30rpx;">
                    {{nickName}}
                </view>
                <view class="card-comment-txt" style="font-size:28rpx;height:{{titleheight}}rpx">
                    {{comment}}
                </view>
                <view class="commentdate" style="font-size:18rpx;height:{{titleheight}}rpx">
                    {{commentdate}}
                </view>
            </view>
        </view>
        <view class="card-body">
            <view qq:if="{{imgurl.length>0?true:false}}">
                <image src="{{imgurl}}" style="height: 200rpx; width: 200rpx;" />
            </view>
            <view qq:if="{{imgurl.length>0?false:true}}">
                <image src="{{otherAvatar}}" style="height: 200rpx; width: 200rpx;" />
            </view>
            <view>
                <view style="font-size:30rpx;height:30rpx; margin-left: 30rpx;">
                    {{otherName}}
                </view>
                <view style="font-size:26rpx;height:30rpx; margin: 30rpx 0 0 30rpx;">
                    {{context}}
                </view>
            </view>
        </view>
    </view>
    <view style="height:50rpx;"/>
</view>

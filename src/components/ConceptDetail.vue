<template>
  <div class="concept-detail">
    <div class="concept-detail__galery">
      <div class="concept-detail__return" @click="closeConceptDetail">Return</div>
    </div>
    <div id="concept-content" class="concept-detail__content">
      <div class="concept-detail__header">
        <h2 class="concept-detail__title">Concept Title</h2>
        <div class="concept-detail__tag-wrapper">
          <div class="concept-detail__tag-item">Text</div>
          <div class="concept-detail__tag-item">Text</div>
          <div class="concept-detail__tag-item">Text</div>
          <div class="concept-detail__tag-item">Text</div>
        </div>
      </div>

      <div class="concept-detail__separator"></div>

      <div class="concept-detail__text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus auctor sed nec in semper tempus imperdiet pretium. Tellus volutpat non orci scelerisque turpis. Quis tincidunt aliquet et vitae. Ultricies ante nam nunc
        </p>
        <p>
          ullamcorper donec quisque quis. Velit hac aliquam convallis aliquam. Mauris tellus pulvinar faucibus iaculis amet semper. Orci sapien hendrerit ultricies nunc. At congue ultrices morbi orci consequat, pellentesque.
          Nec, id dolor purus sapien et, suspendisse. Vel pulvinar volutpat, viverra nunc nam augue est. Tincidunt et eget laoreet congue. Aliquam, eget amet donec sed arcu, turpis arcu tristique. Consectetur nunc nibh auctor turpis platea rhoncus interdum quis. Ultrices dui tortor mi elementum id in. Sit quam sodales egestas nulla. Proin mauris dui odio pellentesque sed neque.
        </p>
        <p>
          Mauris, maecenas in velit vel massa. Eu vulputate orci amet, enim. Iaculis leo eu tellus cursus proin ut fusce. Odio semper odio fringilla ultrices. Pellentesque imperdiet sed sed tempor convallis scelerisque lectus amet, at.
          Convallis sollicitudin consequat, etiam nisl lectus pellentesque donec. Nunc fusce facilisis a sollicitudin ut sed ac. Mauris integer dolor vitae nam enim volutpat, eu dui ut. Neque pellentesque eget mauris, mi. Nisi, interdum sed diam faucibus. Tristique vitae libero, in auctor. Quisque sapien nunc tincidunt lacus, nibh tortor. Bibendum dui feugiat sit nec aenean ornare nisi faucibus. In fermentum elit ultricies molestie tristique mollis. Vitae, risus eget mollis nunc morbi tellus at. Adipiscing eu neque varius congue cursus. Pulvinar phasellus viverra scelerisque facilisi magnis. Eu praesent eu diam in. Interdum eu, sapien aliquam accumsan nec, sagittis porttitor pulvinar. Tellus vitae aliquam consequat dignissim urna pretium.
          Laoreet commodo molestie maecenas sit id sit. Sit nec mattis odio ultrices eleifend sit enim euismod.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus auctor sed nec in semper tempus imperdiet pretium. Tellus volutpat non orci scelerisque turpis. Quis tincidunt aliquet et vitae. Ultricies ante nam nunc
        </p>
        <p>
          ullamcorper donec quisque quis. Velit hac aliquam convallis aliquam. Mauris tellus pulvinar faucibus iaculis amet semper. Orci sapien hendrerit ultricies nunc. At congue ultrices morbi orci consequat, pellentesque.
          Nec, id dolor purus sapien et, suspendisse. Vel pulvinar volutpat, viverra nunc nam augue est. Tincidunt et eget laoreet congue. Aliquam, eget amet donec sed arcu, turpis arcu tristique. Consectetur nunc nibh auctor turpis platea rhoncus interdum quis. Ultrices dui tortor mi elementum id in. Sit quam sodales egestas nulla. Proin mauris dui odio pellentesque sed neque.
        </p>
        <p>
          Mauris, maecenas in velit vel massa. Eu vulputate orci amet, enim. Iaculis leo eu tellus cursus proin ut fusce. Odio semper odio fringilla ultrices. Pellentesque imperdiet sed sed tempor convallis scelerisque lectus amet, at.
          Convallis sollicitudin consequat, etiam nisl lectus pellentesque donec. Nunc fusce facilisis a sollicitudin ut sed ac. Mauris integer dolor vitae nam enim volutpat, eu dui ut. Neque pellentesque eget mauris, mi. Nisi, interdum sed diam faucibus. Tristique vitae libero, in auctor. Quisque sapien nunc tincidunt lacus, nibh tortor. Bibendum dui feugiat sit nec aenean ornare nisi faucibus. In fermentum elit ultricies molestie tristique mollis. Vitae, risus eget mollis nunc morbi tellus at. Adipiscing eu neque varius congue cursus. Pulvinar phasellus viverra scelerisque facilisi magnis. Eu praesent eu diam in. Interdum eu, sapien aliquam accumsan nec, sagittis porttitor pulvinar. Tellus vitae aliquam consequat dignissim urna pretium.
          Laoreet commodo molestie maecenas sit id sit. Sit nec mattis odio ultrices eleifend sit enim euismod.
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';

export default {
  name: 'concept-detail',
  mounted() {
    Scrollbar.init(document.querySelector('#concept-content'));
  },
  methods: {
    closeConceptDetail() {
      this.$store.commit('concepts/closeConceptDetail')
    }
  }
}
</script>

<style lang="scss">
  .scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3) !important;
    cursor: grab;
  }
  .scrollbar-track {
    background: transparent !important;
  }

  .concept-detail {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    padding: 0 48px;
    background: rgba($color: #000000, $alpha: 0.9);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 256px;
        background: linear-gradient(180deg, #080808 7.57%, rgba(6, 6, 6, 0.725382) 52.73%, rgba(0, 0, 0, 0) 98.23%);
        z-index: 1;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 160px;
        background: linear-gradient(0, #080808 7.57%, rgba(6, 6, 6, 0.725382) 52.73%, rgba(0, 0, 0, 0) 98.23%);
        z-index: 1;
    }

    &__galery {
      width: 60%;
      height: 100vh;
      margin-top: 78px;
      padding-top: 100px;
    }

    &__return {
      cursor: pointer;
      z-index: 1;
      position: relative;
    }

    &__content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 40%;
      margin: 128px 8% 48px 0;
      padding-top: 100px;
      overflow-y: scroll;
      padding-right: 24px; 
    }

    &__header {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    &__title {
      width: 100%;
      font-family: 'Krylon';
      font-size: 72px;
      margin-bottom: 24px;
    }

    &__tag-wrapper {
      position: relative;
      display: flex;
      align-self: start;
      gap: 16px;

      &::before {
        content: '';
        width: 100%;
        height: 2px;
        top: 50%;
        transform: translateY(-50%);
        background-color: $black-90;
        position: absolute;
        z-index: 0;

      }
    }

    &__tag-item {
      color: $white-60;
      padding: 8px 12px;
      background: $black-90;
      z-index: 1;
    }

    &__separator {
      width: 50px;
      height: 1px;
      margin: 40px auto;
      background: $gold;
    }

    &__text {
      margin-top: 40px;

      p {
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 32px;
      }
    }
  }
</style>
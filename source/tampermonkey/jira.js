// ==UserScript==
// @name         JIRA Status Extension.
// @version      0.1
// @author       @Andrew Zhang
// @match        https://jira.eng.vmware.com/browse/VMSPP-*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';



  const select = document.querySelector.bind(document),
        selectAll = document.querySelectorAll.bind(document),
        create = document.createElement.bind(document);

  // for filter page;
  // init();
  // select('.list-panel').addEventListener('click',function() {
  //   window.setTimeout(function() {
  //     init();
  //   }, 1000);
  // });

  // function init() {
  //   let loop = window.setInterval(function() {
  //     if(isDomReady()) {
  //       window.clearInterval(loop);
  //       bootstrap();
  //     }
  //   }, 500);
  // }

  function bootstrap() {
    let stagingContainer = createContainer('Build for Staging:'),
        stagingTagEle = createTagEle(stagingContainer);

    const commits$ = serviceHandler.getCommits(),
          deploys$ = serviceHandler.getDeploys();

    Promise.all([commits$, deploys$])
      .then(([commits, deploys]) => {
        const commitEle = selectAll('.link-title');

        const currentCommitId = extract(commitEle);

        const lastDeployCommitId = deploys[0].commit.id;
        let currentIndex = commits.findIndex(c => c.id === currentCommitId),
            lastDeployIndex = commits.findIndex(c => c.id === lastDeployCommitId);
        updateStatus(currentIndex, lastDeployIndex, stagingTagEle);
      });
  }

  function extract(elements) {
    let res = '';
    elements.forEach(ele => {
      const arr = ele.href.split('/');
      const id = arr.pop();
      const type = arr.pop();
      if(type === 'commit') res = id;
    });
    return res;
  }

  /** Service Handler */
  const serviceHandler = (function () {
    const PROJECT_ID = "11726",
          BASE_URL = "https://gitlab.eng.vmware.com/api/v4",

    const TAG_URL = `${BASE_URL}/projects/${PROJECT_ID}/repository/tags`,
          COMMIT_URL = `${BASE_URL}/projects/${PROJECT_ID}/repository/commits`;

    // function gmFetch(url) {
    //   return new Promise(function(resolve, reject) {
    //     GM_xmlhttpRequest({
    //           method: 'GET',
    //           url,
    //           onload: response => {
    //               resolve(JSON.parse(response.responseText));
    //           }
    //       });
    //   });
    // }

    return {
      getDeploys: function() {
        return fetch(TAG_URL, {
          method: 'GET',
          headers: {
              'Private-Token': TOKEN
          }
        }).then(res => res.json());
      },

      getCommits: function() {
        const LIMIT = 200;
        return fetch(COMMIT_URL + `?per_page=${LIMIT}`, {
          method: 'GET',
          headers: {
              'Private-Token': TOKEN
          }
        }).then(res => res.json());
      }
    }
  })();

  /** DOM Render */
  function updateStatus(currentIndex, lastDeployIndex, element) {
    const CLASS_NAME = {
      TAG: 'jira-issue-status-lozenge aui-lozenge',
      READY: 'jira-issue-status-lozenge-green',
      NOT_READY: 'jira-issue-status-lozenge-yellow',
      UNKNOW: 'jira-issue-status-lozenge-blue-gray',
    };

    let status = 0;

    if(currentIndex > 0 || currentIndex >= lastDeployIndex ) {
      status = 2;
    }

    if (currentIndex >= 0 && currentIndex < lastDeployIndex) {
      status = 1;
    }

    switch (status) {
      case 1:
        element.className = `${CLASS_NAME.TAG} ${CLASS_NAME.READY}`;
        element.textContent = 'Not Ready For QA';
        break;
      case 2:
        element.className = `${CLASS_NAME.TAG} ${CLASS_NAME.NOT_READY}`;
        element.textContent = 'Ready For QA';
        break;
      default:
        element.className = `${CLASS_NAME.TAG} ${CLASS_NAME.UNKNOW}`;
        element.textContent = 'Unknown';
        break;
    }
  }

  function createContainer(text) {
    //create ele
    let outer = select('#issuedetails'),
      wrapper = create('li'),
      label = create('strong'),
      tagContainer = create('div');

    // append ele
    outer.append(wrapper);
    wrapper.append(label);
    wrapper.append(tagContainer);

    // add class
    wrapper.className = 'item full-width';
    label.className = 'name';
    tagContainer.className = 'tm-tag-container value';

    label.textContent = text;

    return tagContainer;
  }

  function createTagEle(container) {
    let ele = create('span');
    ele.textContent = 'loading...';
    container.append(ele);
    return ele;
  }

  function isDomReady() {
    if(select('#type-val')) {
      return true;
    }
    return false;
  }

  bootstrap();

})();

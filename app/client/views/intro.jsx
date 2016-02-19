IntroComponent = React.createClass({
  render: function() {
    return (

      <div id="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a className="anchor" id="top" />
              <h1><code>test161</code>: The OS/161 Testing Tool</h1>
              <div className="sect1">
                <a className="anchor" id="_introduction" /><h2>1. Introduction</h2>
                <div className="sectionbody">
                  <div className="paragraph lead">
                    <p><code>test161</code> is the OS/161 testing tool designed and implemented by
                      <a href="https://blue.cse.buffalo.edu/people/shaseley/" target="_blank" className="external">Scott Haseley</a> and
                      <a href="https://blue.cse.buffalo.edu/people/ychen78/" target="_blank" className="external">Yihong Chen</a>. It will both allow
                      you test your assignments locally and submit them our testing server for
                    official evaluation.</p>
                  </div>
                  <div className="paragraph">
                    <p>Below we run through how to install, configure, run, and use <code>test161</code>. While
                      the specific testing target will change from assignment to assignment, we use
                      <a href="/asst/1/">ASST1</a> below as an example. Note that this tutorial duplicates
                      some information from the official <code>test161</code>
                      <a href="https://github.com/ops-class/test161/blob/master/README.adoc" target="_blank" className="external">README</a> located
                      on the project’s <a href="https://github.com/ops-class/test161" target="_blank" className="external">GitHub page</a>.</p>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_installation" /><h3>1.1. Installation</h3>
                    <div className="paragraph">
                      <p>Eventually <code>test161</code> will be distributed as part of the OS/161 toolchain,
                        allowing you to install it from the
                        <a href="https://launchpad.net/~geoffrey-challen/+archive/ubuntu/os161-toolchain/" target="_blank" className="external"><code>ops-class.org</code>
                        Launchpad PPA</a>. However, at the moment the installation is a bit more
                      complicated.</p>
                    </div>
                    <div className="sect3">
                      <a className="anchor" id="_installing_go" /><h4>1.1.1. Installing Go</h4>
                      <div className="paragraph">
                        <p><code>test161</code> is written in <a href="https://golang.org/" target="_blank" className="external">Go</a> <span className="badge footnote default-tooltip" data-toggle="popover" data-placement="top" data-html="true" data-content="Which is awesome. &lt;a href=&quot;https://tour.golang.org/&quot; target=&quot;_blank&quot; class=&quot;external&quot;&gt;Learn it!&lt;/a&gt;">1</span>. So to install <code>test161</code> you must first
                          install Go. Unfortunately, most Linux distributions package a fairly
                          out-of-date version of Go. However, Go has binary distributions prepared for
                          <a href="https://golang.org/dl/" target="_blank" className="external">most programming environments</a>. <strong>But
                            keep in mind that you need to install <code>test161</code> in the same environment where
                          you compile and run your OS/161 kernel.</strong> So you should install Go there as
                        well.</p>
                        </div>
                      <div className="paragraph">
                        <p>An excellent alternative to Go’s <a href="https://golang.org/dl/" target="_blank" className="external">official packages</a>
                          is <a href="https://github.com/moovweb/gvm" target="_blank" className="external">GVM, the Go Version Manager</a>. We encourage
                          you to use this excellent tool. GVM is very easy to install on the Ubuntu
                          systems that we have packaged the OS/161 toolchain for:</p>
                      </div>
                      <div className="listingblock noautohighlight">
                        <div className="content">
                          <pre className="highlight"><code>sudo apt-get install -y curl bison # Install installation requirements{"\n"}bash &lt; &lt;(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer){"\n"}source $HOME/.gvm/scripts/gvm</code></pre>
                        </div>
                      </div>
                      <div className="paragraph">
                        <p>At this point you are ready to start using GVM. We are currently building and
                          testing <code>test161</code> with Go version <code>go1.5.3</code>. However, because the Go
                          compiler is now written in Go, installing versions of Go past 1.5 require
                          installing Go version 1.4 first.</p>
                      </div>
                      <div className="listingblock noautohighlight">
                        <div className="content">
                          <pre className="highlight"><code>gvm install go1.4{"\n"}gvm use 1.4{"\n"}gvm install go1.5.3{"\n"}gvm use 1.5.3 --default</code></pre>
                        </div>
                      </div>
                      <div className="paragraph">
                        <p>Once you have installed Go 1.6 you can remove Go 1.4 if you like:</p>
                      </div>
                      <div className="listingblock noautohighlight">
                        <div className="content">
                          <pre className="highlight"><code>gvm uninstall go1.4</code></pre>
                        </div>
                      </div>
                    </div>
                    <div className="sect3">
                      <a className="anchor" id="_setting_your_code_gopath_code" /><h4>1.1.2. Setting your <code>GOPATH</code></h4>
                      <div className="paragraph">
                        <p>Note that <code>gvm</code> will set your <code>GOPATH</code> and <code>PATH</code> variables properly to allow
                          you to run Go binaries that you install. However, if you did not use GVM or
                          are interested in writing Go code you should set a more accessible <code>GOPATH</code>
                          as described as <a href="https://golang.org/doc/code.html#GOPATH" target="_blank" className="external">described here.</a> If
                          you do not set your <code>GOPATH</code> environment variable correctly the following
                          steps will fail. And if you do not set your <code>PATH</code> environment variable to
                          include the directory where Go installs binaries you will not be able to run
                          <code>test161</code> from your path.</p>
                      </div>
                    </div>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_installing_code_test161_code" /><h3>1.2. Installing <code>test161</code></h3>
                    <div className="paragraph">
                      <p>Once you have Go installed, upgrading or installing <code>test161</code> is simple:</p>
                    </div>
                    <div className="listingblock noautohighlight">
                      <div className="content">
                        <pre className="highlight"><code>go get -u github.com/ops-class/test161/test161</code></pre>
                      </div>
                    </div>
                    <div className="paragraph">
                      <p>If this completes successfully, and if have set your <code>GOPATH</code> and <code>PATH</code>
                        variables properly as described above, you will we able to run <code>test161</code>:</p>
                    </div>
                    <div className="listingblock noautohighlight">
                      <div className="content">
                        <pre className="highlight"><code>$ test161{"\n"}{"\n"}{"    "}usage: test161{"  "}&lt;command&gt; &lt;flags&gt; &lt;args&gt;{"\n"}{"\n"}{"           "}test161 run [-dry-run | -r] [sequential | -s] [-dependencies | -d]{"\n"}{"                       "}[-verbose | -v (whisper|quiet|loud*)] [-tag] &lt;names&gt;{"\n"}...</code></pre>
                      </div>
                    </div>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_configuration" /><h3>1.3. Configuration</h3>
                    <div className="paragraph">
                      <p><code>test161</code> requires a configuration file to operate. If you run <code>test161 run</code>
                        it will get you started with some example values. You can create your
                        <code>.test161.conf</code> file either in your home directory—​which is probably best
                        for most users—​or in your OS/161 root directory where you run <code>test161</code>.</p>
                    </div>
                    <div className="paragraph">
                      <p>For local testing your configuration file only needs to tell <code>test161</code> where
                        to find your OS/161 root directory and where to find the <code>test161</code>
                        target, test, and command files. Here’s an example that works in the OS/161
                        Vagrant VM that we provide:</p>
                    </div>
                    <div className="listingblock noautohighlight">
                      <div className="content">
                        <pre className="highlight"><code>rootdir: /home/trinity/root/{"\n"}test161dir: /home/trinity/src/test161/</code></pre>
                      </div>
                    </div>
                    <div className="paragraph">
                      <p>We’ll add more values to the <code>.test161.conf</code> file later when we set up
                        <code>test161</code> to submit your assignment for grading.</p>
                    </div>
                    <div className="paragraph">
                      <p><strong>Note that the <code>test161.conf</code> file is in <a href="http://yaml.org/" target="_blank" className="external">YAML</a> syntax and
                          that YAML doesn’t like tabs.</strong> You may want to disable tab expansion when
                        editing your <code>.test161.conf</code> file if your normal editor performs it.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sect1">
                <a className="anchor" id="_running_code_test161_code_targets" /><h2>2. Running <code>test161</code> Targets</h2>
                <div className="sectionbody">
                  <div className="paragraph lead">
                    <p><code>test161</code> is a very flexible tool and can rapidly run one or many tests and
                      evaluate their output.</p>
                  </div>
                  <div className="paragraph">
                    <p>For this example, we’ll assume that you want to run all tests for ASST1 and
                      perform grading. To do that, you provide the <code>asst1</code> target as the argument
                      to <code>test161 run</code>. Here’s what happens when we run it on the base sources
                      downloaded from the <a href="https://github.com/ops-class/os161" target="_blank" className="external"><code>ops-class.org</code> OS/161
                        GitHub repository</a>:</p>
                  </div>
                  <div className="listingblock noautohighlight">
                    <div className="content">
                      <pre className="highlight"><code>$ test161 run asst1{"\n"}0.000000{"\t"}sys161: System/161 release 2.0.6, compiled Feb 16 2016 01:44:26{"\n"}0.014289{"\n"}0.014289{"\t"}OS/161 base system version 2.0.1{"\n"}0.014289{"\t"}Copyright (c) 2000, 2001-2005, 2008-2011, 2013, 2014{"\n"}0.014289{"\t"}{"   "}President and Fellows of Harvard College.{"  "}All rights reserved.{"\n"}0.236243{"\n"}0.236243{"\t"}Put-your-group-name-here's system version 0 (ASST1 #2){"\n"}0.266461{"\n"}0.266461{"\t"}756k physical memory available{"\n"}0.286483{"\t"}Device probe...{"\n"}0.286483{"\t"}lamebus0 (system main bus){"\n"}...{"\n"}2.965587{"\t"}Operation took 0.018019320 seconds{"\n"}2.991262{"\t"}OS/161 kernel [? for menu]:{"\n"}2.849897{"\t"}OS/161 kernel [? for menu]:{"\n"}2.844126{"\t"}OS/161 kernel [? for menu]:{"\n"}3.026152{"\t"}cvt3: Should panic...{"\n"}3.036162{"\t"}cvt3: FAIL{"\n"}3.046057{"\t"}OS/161 kernel [? for menu]:{"\n"}3.036162{"\t"}Operation took 0.053904920 seconds{"\n"}3.076270{"\t"}OS/161 kernel [? for menu]:{"\n"}2.914384{"\t"}lt1: FAIL{"\n"}2.914384{"\t"}Operation took 0.087485440 seconds{"\n"}2.934525{"\t"}OS/161 kernel [? for menu]:{"\n"}Test{"                             "}Result{"       "}Score{"\n"}------------------------------{"   "}----------{"   "}----------{"\n"}boot.t{"                           "}correct{"      "}0/0{"\n"}sync/rwt5.t{"                      "}incorrect{"    "}0/1{"\n"}sync/rwt4.t{"                      "}incorrect{"    "}0/1{"\n"}sync/rwt3.t{"                      "}incorrect{"    "}0/1{"\n"}sync/cvt4.t{"                      "}incorrect{"    "}0/1{"\n"}sync/rwt1.t{"                      "}incorrect{"    "}0/5{"\n"}sync/rwt2.t{"                      "}incorrect{"    "}0/2{"\n"}sync/lt2.t{"                       "}incorrect{"    "}0/1{"\n"}sync/lt3.t{"                       "}incorrect{"    "}0/1{"\n"}sync/cvt3.t{"                      "}incorrect{"    "}0/1{"\n"}sync/lt1.t{"                       "}incorrect{"    "}0/8{"\n"}sync/cvt1.t{"                      "}skip{"         "}0/4{"\n"}syncprobs/sp2.t{"                  "}skip{"         "}0/10{"\n"}sync/cvt2.t{"                      "}skip{"         "}0/4{"\n"}syncprobs/sp1.t{"                  "}skip{"         "}0/10{"\n"}{"\n"}Total Correct{"  "}: 1/15{"\n"}Total Incorrect: 10/15{"\n"}Total Aborted{"  "}: 4/15{"\n"}{"\n"}Total Score{"    "}: 0/50</code></pre>
                    </div>
                  </div>
                  <div className="paragraph">
                    <p>As you can see, <code>test161</code> has rapidly generated a lot of useful output while
                      also giving our base sources the score they deserve on <a href="/asst/1">ASST1</a>:
                      0/50! Let’s quickly go through the two mains parts of the <code>test161</code> output.</p>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="__code_sys161_code_output" /><h3>2.1. <code>sys161</code> Output</h3>
                    <div className="paragraph">
                      <p>To speed execution, <code>test161</code> runs multiple tests in parallel. As a result,
                        test output is interleaved at parts of the testing suite where multiple tests
                        are being run. At the beginning of the ASST1 test suite only the boot test is
                        being performed because all other tests depend on it, so the output is not
                        interleaved. However, at the end several tests are being run in parallel and
                        so the output is interleaved.</p>
                    </div>
                    <div className="paragraph">
                      <p>This can be difficult to interpret, so <code>test161 run</code> provides a <code>-s</code> option.
                        This does not effect parallel testing, which <code>test161</code> will still perform
                        when the dependency graph allows it. However, it does make the output
                        sequential and easier to read.</p>
                    </div>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_test_status" /><h3>2.2. Test Status</h3>
                    <div className="paragraph">
                      <p>Following the test output <code>test161</code> prints a summary detailing what tests
                        were performed and, if appropriate, how they were scored. Scoring is optional
                        and only performed when using certain targets.</p>
                    </div>
                    <div className="paragraph">
                      <p>In the example above, the output shows that <code>boot.t</code> ran correctly but earned
                        no points. That is because the kernel booted but this was not worth any
                        points for ASST1. However, if the kernel had not booted the rest of the tests
                        would have been skipped. In this case, <code>boot.t</code> was run because it was
                        specified as a <em>dependency</em> by other tests that were included as part of the
                        ASST1 target. <code>test161</code> can automatically run test dependencies when
                        appropriate.</p>
                    </div>
                    <div className="paragraph">
                      <p>For the next 10 tests above <code>test161</code> reports that they did not complete
                        correctly. Again, this is unsurprising given that the base OS/161 sources do
                        not include working locks, condition variables, or reader-writer locks. As
                        you complete portions of each assignment you will notice that your score will
                        increase.</p>
                    </div>
                    <div className="paragraph">
                      <p>For the final 4 tests <code>test161</code> reports them as being skipped. This was
                        because their dependencies were not met. For example, the condition-variable
                        tests <code>cvt{1,2}</code> depend on working locks, and these locks did not work.
                        Similarly, both the stoplight and whale mating synchronization test drivers
                        rely on working locks.</p>
                    </div>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_running_single_code_test161_code_tests" /><h3>2.3. Running Single <code>test161</code> Tests</h3>
                    <div className="paragraph">
                      <p>In our example above <code>test161</code> was used to run a <em>target</em>, which configures a
                        set of tests to be run and maps test results to point values. If you are
                        curious, look at the <code>asst1.tt</code> file located in the <code>test161</code> subdirectory of
                        your OS/161 source tree. (Or wherever you configured your <code>test161dir</code> in
                        <code>.test161.conf</code>.)</p>
                    </div>
                    <div className="paragraph">
                      <p>But <code>test161</code> can also be a part of your development process by running
                        single tests and reporting their output (without scores). Here is an example,
                        again with the base OS/161 sources:</p>
                    </div>
                    <div className="listingblock noautohighlight">
                      <div className="content">
                        <pre className="highlight"><code>$ test161 run sync/sem1.t{"\n"}0.000000{"\t"}sys161: System/161 release 2.0.6, compiled Feb 16 2016 01:44:26{"\n"}0.000000{"\n"}0.000000{"\t"}OS/161 base system version 2.0.1{"\n"}0.018289{"\t"}Copyright (c) 2000, 2001-2005, 2008-2011, 2013, 2014{"\n"}0.018289{"\t"}{"   "}President and Fellows of Harvard College.{"  "}All rights reserved.{"\n"}0.228843{"\n"}0.228843{"\t"}Put-your-group-name-here's system version 0 (ASST1 #2){"\n"}....{"\n"}3.917044{"\t"}sys161:{"   "}cpu7: 739019 kern, 0 user, 39921249 idle; 354 ll, 346/8{"\n"}sc, 895 sync{"\n"}3.917044{"\t"}sys161: 8673 irqs 0 exns 0r/0w disk 7r/5548w console 0r/0w/1m emufs{"\n"}0r/0w net{"\n"}3.917044{"\t"}sys161: Elapsed real time: 1.608594 seconds (86.582 mhz){"\n"}3.917044{"\t"}sys161: Elapsed virtual time: 3.919384560 seconds (25 mhz){"\n"}{"\n"}Test{"                             "}Result{"\n"}------------------------------{"   "}----------{"\n"}sync/sem1.t{"                      "}correct{"\n"}{"\n"}Total Correct{"  "}: 1/1</code></pre>
                      </div>
                    </div>
                    <div className="paragraph">
                      <p>In this case we ran the semaphore test <code>sem1</code>, which does work in the base
                        sources, and <code>test161</code> produced output reflecting that. You can also tell
                        <code>test161</code> to run both a test and its dependencies by providing the <code>-d</code> flag
                        to <code>test161 run</code>. The output of <code>test161 run -d sync/sem1.t</code> will show that
                        both <code>sem1</code> and it’s dependency (<code>boot.t</code>) were run.</p>
                    </div>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_running_groups_of_tests" /><h3>2.4. Running Groups of Tests</h3>
                    <div className="paragraph">
                      <p>The name passed to <code>test161 run</code> identifies a test relative to the <code>tests</code>
                        subdirectory of the the <code>test161dir</code> configured in <code>.test161.conf</code>. In this
                        case, <code className="small">~/src/test161/tests/sync/sem1.t</code> contains:</p>
                    </div>
                    <div className="listingblock">
                      <div className="content">
                        <pre className="highlight"><code className="language-yaml lang-yaml" data-lang="yaml"><span className="hljs-meta">---</span>{"\n"}<span className="hljs-attr">name:</span> <span className="hljs-string">"Semaphore Test"</span>{"\n"}<span className="hljs-attr">tags:</span>{"\n"}<span className="hljs-bullet">{"  "}-</span> sync{"\n"}<span className="hljs-bullet">{"  "}-</span> semaphore{"\n"}<span className="hljs-attr">depends:</span>{"\n"}<span className="hljs-bullet">{"  "}-</span> boot{"\n"}<span className="hljs-meta">---</span>{"\n"}sem1</code></pre>
                      </div>
                    </div>
                    <div className="paragraph">
                      <p>You’ll notice that the <code>sem1</code> test also belongs to two groups: <code>sync</code> and
                        <code>semaphore</code>. Groups provide another useful way to run <code>test161</code>:</p>
                    </div>
                    <div className="listingblock noautohighlight">
                      <div className="content">
                        <pre className="highlight"><code>$ test161 run sync{"\n"}...{"\n"}Test{"                             "}Result{"\n"}------------------------------{"   "}----------{"\n"}sync/rwt3.t{"                      "}incorrect{"\n"}sync/lt2.t{"                       "}incorrect{"\n"}sync/rwt4.t{"                      "}incorrect{"\n"}sync/rwt5.t{"                      "}incorrect{"\n"}sync/cvt3.t{"                      "}incorrect{"\n"}sync/lt3.t{"                       "}incorrect{"\n"}sync/cvt4.t{"                      "}incorrect{"\n"}sync/rwt2.t{"                      "}incorrect{"\n"}sync/lt1.t{"                       "}incorrect{"\n"}sync/rwt1.t{"                      "}incorrect{"\n"}sync/cvt1.t{"                      "}incorrect{"\n"}sync/sem1.t{"                      "}correct{"\n"}sync/cvt2.t{"                      "}incorrect{"\n"}{"\n"}Total Correct{"  "}: 1/13{"\n"}Total Incorrect: 12/13</code></pre>
                      </div>
                    </div>
                    <div className="paragraph">
                      <p>Here we’ve asked <code>test161</code> to run all of the tests that are in the <code>sync</code>
                        group. Note that, unlike the <code>asst1</code> target, in this case dependencies were
                        not requested and so <code>cvt{1,2}</code> were run even though the lock tests failed.
                        To respect test dependencies provide <code>test161</code> with the <code>-d</code> flag.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sect1">
                <a className="anchor" id="_submitting_using_code_test161_code" /><h2>3. Submitting Using <code>test161</code></h2>
                <div className="sectionbody">
                  <div className="paragraph">
                    <p>We will provide more information about using <code>test161</code> to submit your
                      <code>ops-class.org</code> assignments once the submission server is ready.</p>
                  </div>
                </div>
              </div>
              <div className="sect1">
                <a className="anchor" id="_writing_code_test161_code_tests" /><h2>4. Writing <code>test161</code> Tests</h2>
                <div className="sectionbody">
                  <div className="paragraph lead">
                    <p><code>test161</code> is designed to allow you to test your kernel using both the tests
                      we have provided and new tests that you may write for each assignment.</p>
                  </div>
                  <div className="paragraph">
                    <p>Below we describe how to create and run your own <code>test161</code> scripts. But
                      first, we describe the three key components of the <code>test161</code> configuration
                      directory: tests, commands, and targets.</p>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_tests" /><h3>4.1. Tests</h3>
                    <div className="paragraph">
                      <p>The main <code>test161</code> configuration object is a test, which are stored in files
                        with a <code>.t</code> extension <span className="badge footnote default-tooltip" data-toggle="popover" data-placement="top" data-html="true" data-content="In homage to the original <code>test161</code> tool that David wrote years ago that also used a <code>.t</code> extension.">2</span>. Here is an example
                        from <code>test161/synch/sem1.t</code>:</p>
                    </div>
                    <div className="listingblock noautohighlight">
                      <div className="content">
                        <pre className="highlight"><code>---{"\n"}name: "Semaphore Test"{"\n"}description:{"\n"}{"  "}Tests core semaphore logic through cycling signaling.{"\n"}tags: [synch, semaphores]{"\n"}depends: [boot]{"\n"}sys161:{"\n"}{"  "}cpus: 32{"\n"}---{"\n"}sem1</code></pre>
                      </div>
                    </div>
                    <div className="sect3">
                      <a className="anchor" id="_front_matter" /><h4>4.1.1. Front matter</h4>
                      <div className="paragraph">
                        <p>The test consist of two parts. The header in between the first and second
                          <code>---</code> is <a href="http://yaml.org" target="_blank" className="external">YAML</a> front matter that provides test metadata. Here
                          it provides the name and a description of the test, includes the test in the
                          <code>synch</code> and <code>semaphores</code> tags, indicates that the test depends on the <code>boot</code>
                          test group, and configures <code>sys161</code> to run the test with 32 cores.</p>
                      </div>
                      <div className="paragraph">
                        <p>We will eventually provide more detail about test configuration options on
                          the <a href="https://github.com/ops-class/test161" target="_blank" className="external">GitHub page</a>, but for now you can
                          get a sense for the options by reading other test files and looking at the
                          <a href="https://github.com/ops-class/test161#default-settings" target="_blank" className="external"><code>test161</code> defaults</a>.
                          About the only commonly useful option not used by <code>sem1.t</code> is a <code>ram</code> option
                          for <code>sys161</code>.</p>
                      </div>
                    </div>
                    <div className="sect3">
                      <a className="anchor" id="_test_inputs" /><h4>4.1.2. Test inputs</h4>
                      <div className="paragraph">
                        <p>After the front matter comes the test itself. <code>test161</code> tests can be
                          considered series of inputs to the <code>sys161</code> simulator, plus a bit of
                          <a href="https://github.com/ops-class/test161#testfile-syntactic-sugar" target="_blank" className="external">syntactic
                            sugar</a>. For example, in this case note that we did not need to explicitly
                          shut the kernel down: <code>sem1</code> expands automatically to <code>sem1; q</code>.</p>
                      </div>
                      <div className="paragraph">
                        <p>This is particularly useful when running commands from the shell. <code>test161</code>
                          provides a <code>$</code> prefix indicating that a command should be run from the shell,
                          and knows how to start and exit the shell as appropriate. So this single
                          command:</p>
                      </div>
                      <div className="listingblock noautohighlight">
                        <div className="content">
                          <pre className="highlight"><code>$ /bin/true</code></pre>
                        </div>
                      </div>
                      <div className="paragraph">
                        <p>expands to:</p>
                      </div>
                      <div className="listingblock noautohighlight">
                        <div className="content">
                          <pre className="highlight"><code>s{"\n"}/bin/true{"\n"}exit{"\n"}q</code></pre>
                        </div>
                      </div>
                    </div>
                    <div className="sect3">
                      <a className="anchor" id="_groups_of_tests" /><h4>4.1.3. Groups of tests</h4>
                      <div className="paragraph">
                        <p><code>test161</code> allows you to group tests together using tags. For example, the
                          <code>sem1.t</code> test above is part of both the <code>semaphores</code> group (by itself) and
                          the <code>synch</code> group with a bunch of other tests, including <code>rwt{1-4}</code>,
                          <code>cvt{1-5}</code>, etc. Tags can be used both as arguments to <code>test161 run</code>:</p>
                      </div>
                      <div className="listingblock">
                        <div className="content">
                          <pre className="highlight"><code className="language-bash lang-bash" data-lang="bash"><span className="hljs-built_in">test</span>161 run synch</code></pre>
                        </div>
                      </div>
                      <div className="paragraph">
                        <p>and as dependencies to other tests. As shown above, the <code>sem1.t</code> test depends
                          on the <code>boot</code> group which currently consists only of <code>test161/boot.t</code>. Here
                          is another example from <code>cvt1.t</code>:</p>
                      </div>
                      <div className="listingblock noautohighlight">
                        <div className="content">
                          <pre className="highlight"><code>---{"\n"}name: "CV Test 1"{"\n"}description:{"\n"}{"  "}Tests core CV functionality through cyclic waiting.{"\n"}tags: [synch, cvs]{"\n"}depends: [boot, semaphores, locks]{"\n"}sys161:{"\n"}{"  "}cpus: 32{"\n"}---{"\n"}cvt1</code></pre>
                        </div>
                      </div>
                      <div className="paragraph">
                        <p>Note that <code>cvt1.t</code> depends on <code>boot</code>, <code>locks</code> (since CVs require working
                          locks), and <code>semaphores</code> (since the test uses semaphores to shut down
                          cleanly).</p>
                      </div>
                    </div>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_identifying_single_tests" /><h3>4.2. Identifying single tests</h3>
                    <div className="paragraph">
                      <p>Single tests can also be passed to <code>test161 run</code> or used as dependencies.
                        Single tests are identified by the relative path to the test file from the
                        <code>test161</code> configuration directory. For example, to run <code>boot.t</code> you would run
                        <code>test161 run boot.t</code>, and to run the <code>sem1.t</code> located in
                        <code>test161/synch/sem1.t</code> you would run <code>test161 run synch/sem1.t</code>.</p>
                    </div>
                    <div className="paragraph">
                      <p>Dependencies use the same syntax, <em>regardless of where the file that is
                          expressing the dependency is located</em>. For example, in <code>synch/cvt2.1.</code> we
                        could use <code>depends: [boot.t]</code>, or <code>depends: [synch/lt1.t]</code>.</p>
                    </div>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_commands" /><h3>4.3. Commands</h3>
                    <div className="paragraph">
                      <p><code>test161</code> tests consist of a series of <em>commands</em> that are actually executed
                        by the running OS/161 kernel or shell. To process the output of a test,
                        <code>test161</code> needs to know what it should expect each test to do and what
                        constitutes success and failure. For example, some of our stability tests
                        intentionally create a panic, and in other cases tests may intentionally
                        hang: like <code>/testbin/forkbomb</code> for <a href="/asst/2/">ASST2</a>.</p>
                    </div>
                    <div className="paragraph">
                      <p><code>test161</code> reads this information from all files with <code>.tc</code> extensions in the
                        <code>commands</code> subdirectory. Files in that directory are again in
                        <a href="http://yaml.org" target="_blank" className="external">YAML</a> syntax and can be processed in any order. Here is a
                        snippet from `commands/</p>
                    </div>
                    <div className="listingblock noautohighlight">
                      <div className="content">
                        <pre className="highlight"><code>templates:{"\n"}{"  "}- name: sem1{"\n"}{"  "}- name: lt1{"\n"}{"\t"}...{"\n"}{"  "}- name: lt2{"\n"}{"    "}panics: yes{"\n"}{"    "}output:{"\n"}{"      "}- text: "lt2: Should panic..."</code></pre>
                      </div>
                    </div>
                    <div className="paragraph">
                      <p>Each commands file should define a single <code>templates</code> object consisting of an
                        array of output templates. Each names a single command, such as <code>sem1</code>, and
                        describes the output. By default, for tests that are only listed in a <code>.tc</code>
                        file <code>test161</code> will expect that output <code>&lt;command name&gt;: SUCCESS</code> indicates
                        success and the absence of this string indicates failure. Note that commands
                        must be named in a command file for this default to apply. Some commands,
                        like <code>q</code> and <code>exit</code>, do not succeed or fail—​as long as they do not panic,
                        which <code>test161</code> monitors separately. So they are omitted from the <code>.tc</code> file.</p>
                    </div>
                    <div className="paragraph">
                      <p>The commands file can also indicate more about the expected output. For
                        example, the entry above for <code>lt2</code> indicates that it should panic on success
                        and print <code>lt2: Should panic</code> before panicking.</p>
                    </div>
                  </div>
                  <div className="sect2">
                    <a className="anchor" id="_targets" /><h3>4.4. Targets</h3>
                    <div className="paragraph">
                      <p>Tests and commands allow <code>test161</code> to run test scripts to evaluate your
                        OS/161 kernel. However, grading assignments requires one additional
                        components: <em>targets</em>.</p>
                    </div>
                    <div className="paragraph">
                      <p>Target files have a <code>.tt</code> extension and live in the <code>targets</code> subdirectory.
                        Each target configures a set of tests to run and their point values as well
                        as the kernel configuration and overlay used to build your kernel for that
                        specific target. Here is an example again drawn from <a href="/asst/1/">ASST1</a>:</p>
                    </div>
                    <div className="listingblock noautohighlight">
                      <div className="content">
                        <pre className="highlight"><code>name: asst1{"\n"}version: 1{"\n"}points: 50{"\n"}type: asst{"\n"}kconfig: ASST1{"\n"}tests:{"\n"}{"  "}- id: synch/lt1.t{"\n"}{"    "}points: 8{"\n"}{"  "}- id: synch/lt2.t{"\n"}{"    "}points: 1{"\n"}{"  "}- id: synch/lt3.t{"\n"}{"    "}points: 1{"\n"}...</code></pre>
                      </div>
                    </div>
                    <div className="paragraph">
                      <p>Format is again, <a href="http://yaml.org" target="_blank" className="external">YAML</a>. This target tells <code>test161</code> to use
                        the <code>ASST1</code> kernel configuration file, that there should be 50 total points
                        included in all of the tests, and that this is a assignment-type
                        configuration. We will also eventually distribute performance targets
                        allowing you to race your OS/161 kernel against other students.</p>
                    </div>
                    <div className="paragraph">
                      <p>After the configuration each target includes a lists of tests to run,
                        identified using the single-test format described above. It also maps test
                        success output to points, and includes flexible ways to give partial credit
                        for tests and commands that support partial credit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="scrollspy" className="col-md-2 spelling_exception">
              <ul id="side" className="nav hidden-xs hidden-sm" data-spy="affix" style={{paddingTop: 20, paddingRight: 10}}>
                <li className="h5"><a href="#top">1. Introduction</a>
                  <ul className="nav">
                    <li className="h6"><a href="#_installation">1.1. Installation</a></li>
                    <li className="h6"><a href="#_installing_code_test161_code">1.2. Installing test161</a></li>
                    <li className="h6"><a href="#_configuration">1.3. Configuration</a></li>
                  </ul>
                </li>
                <li className="h5"><a href="#_running_code_test161_code_targets">2. Running test161 Targets</a>
                  <ul className="nav">
                    <li className="h6"><a href="#__code_sys161_code_output">2.1. sys161 Output</a></li>
                    <li className="h6"><a href="#_test_status">2.2. Test Status</a></li>
                    <li className="h6"><a href="#_running_single_code_test161_code_tests">2.3. Running Single test161 Tests</a></li>
                    <li className="h6"><a href="#_running_groups_of_tests">2.4. Running Groups of Tests</a></li>
                  </ul>
                </li>
                <li className="h5"><a href="#_submitting_using_code_test161_code">3. Submitting Using test161</a>
                </li>
                <li className="h5"><a href="#_writing_code_test161_code_tests">4. Writing test161 Tests</a>
                  <ul className="nav">
                    <li className="h6"><a href="#_tests">4.1. Tests</a></li>
                    <li className="h6"><a href="#_identifying_single_tests">4.2. Identifying single tests</a></li>
                    <li className="h6"><a href="#_commands">4.3. Commands</a></li>
                    <li className="h6"><a href="#_targets">4.4. Targets</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

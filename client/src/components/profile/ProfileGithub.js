import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGitHubRepos } from "./../../actions/profile";
import Spinner from "./../layout/Spinner";

const ProfileGithub = ({ username, getGitHubRepos, repos }) => {
    useEffect(() => {
        getGitHubRepos(username);
    }, [getGitHubRepos]);

    return (
        <div className="profile-github">
            {/* <h2 className="text-primary my-1">Github Repos</h2> */}
            <h2 className="text-primary my-1">Repositorios de Github</h2>
            {repos === null ? (
                <Spinner />
            ) : repos.length > 0 ? (
                repos.map((repo) => (
                    <div className="repo bg-white p-1 m-1" key={repo.id}>
                        <div className="">
                            <h4>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener norefer"
                                >
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dark">
                                    Watchers: {repo.watchers}
                                </li>
                                <li className="badge badge-light">
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                // <h4>No repos founded</h4>
                <h4>No fueron encontrados repositorios</h4>
            )}
        </div>
    );
};

ProfileGithub.propTypes = {
    getGitHubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub);
